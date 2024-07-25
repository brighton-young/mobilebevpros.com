/* eslint-disable camelcase */
import {
  CalculatorSettings,
  GeoApifyPlaceSuggestionProperties,
  GeoJsonFeatureCollection,
} from '@cc/types';

import { useFeatureFlags } from '../../../CalculatorState';
import ElementClassNameWrapper from '../../../components/ElementClassNameWrapper';
import ElementStyleWrapper from '../../../components/ElementStyleWrapper';
import ElementTitleWrapper from '../../../components/ElementTitleWrapper';
import FieldError from '../../../components/FieldError';
import PlacePickerField from '../../../components/PlacePickerField';
import {
  HandleValueChange,
  ValueObject,
} from '../../../components/TreeItemElementRenderer';
import useFetchDistances from '../../../effects/useFetchDistances';
import useFetchPlaceDetails from '../../../effects/useFetchPlaceDetails';
import useFetchPlaceSuggestions from '../../../effects/useFetchPlaceSuggestions';
import { formatDistanceMatrixResults } from '../../../util/formatDistanceMatrixResults';
import useJumpToNextView from '../../common/hooks/useJumpToNextView';

const getAddressComponents = (components = []) => {
  const find = (type) => {
    return components.find(({ types }) => {
      return types?.includes(type);
    })?.long_name;
  };

  const postalCode = find('postal_code');
  const country = find('country');
  const province = find('administrative_area_level_1');
  const locality = find('locality');
  const sublocality = find('sublocality');
  const route = find('route');
  const streetNumber = find('street_number');

  return {
    postalCode,
    country,
    province,
    locality,
    sublocality,
    route,
    streetNumber,
  };
};

type PlaceProps = {
  error: string;
  isHidden: boolean;
  onValueChange: HandleValueChange;
  question: PlaceElement;
  settings: CalculatorSettings;
  valueObject: ValueObject;
};

export type PlaceElement = {
  type: 'place';
  _id: string;
  reference: string;
  shouldAddVisibilityLogic: boolean;
  place: {
    originPlace: {
      _id: string;
      label: string;
      value: string;
    };
    placeholder: string;
    restrictToCountries: string[];
    shouldRestrictToCountries: boolean;
    shouldUseOriginPlace: boolean;
  };
};

const Place = ({
  error,
  isHidden,
  settings,
  onValueChange,
  question,
}: PlaceProps) => {
  const { language, messages, numberFormatting, systemOfMeasurement } =
    settings;
  const { place } = question;
  const { originPlace, shouldUseOriginPlace } = place;

  const { placesViaGeoapify } = useFeatureFlags();

  const fetchDistances = useFetchDistances();
  const fetchPlaceDetails = useFetchPlaceDetails();
  const fetchPlaceSuggestions = useFetchPlaceSuggestions();

  const { handleJumpToNextView } = useJumpToNextView({ question });

  const handleChangeOld = async (
    name,
    selectedPlace: {
      label: string;
      value: string;
      placeDetails: {
        geometry: {
          location: {
            lat: number;
            lng: number;
          };
        };
        address_components: {
          long_name: string;
          short_name: string;
          types: string[];
          postal_code?: string;
          country?: string;
          administrative_area_level_1?: string;
          locality?: string;
          sublocality?: string;
          route?: string;
          street_number?: string;
        }[];
      };
    },
  ) => {
    if (!selectedPlace?.placeDetails) {
      onValueChange(question.reference, {
        label: '',
        value: 0,
        error: question.isRequired ? messages.placeRequired : undefined,
        data: {
          distance: 0,
          duration: 0,
        },
      });

      return;
    }

    const { placeDetails } = selectedPlace;

    const { geometry, address_components: addressComponents = [] } =
      placeDetails;

    if (!shouldUseOriginPlace || !originPlace || !originPlace.value) {
      const {
        postalCode,
        country,
        province,
        locality,
        sublocality,
        route,
        streetNumber,
      } = getAddressComponents(addressComponents);

      onValueChange(question.reference, {
        label: selectedPlace.label,
        value: selectedPlace.value,
        data: {
          lat: geometry?.location?.lat,
          latitude: geometry?.location?.lat,
          lng: geometry?.location?.lng,
          longitude: geometry?.location?.lng,
          postal_code: postalCode,
          country,
          province,
          locality,
          sublocality,
          route,
          street_number: streetNumber,
        },
        error: undefined,
      });

      handleJumpToNextView();
      return;
    }

    const result = await fetchDistances({
      destinations: [
        {
          type: 'placeId',
          value: selectedPlace.value,
        },
      ],
      origins: [
        {
          type: 'placeId',
          value: originPlace.value,
        },
      ],
    });

    const { distance, duration, formattedDistance, postfix } =
      formatDistanceMatrixResults(
        result,
        numberFormatting,
        systemOfMeasurement,
      );

    onValueChange(question.reference, {
      label: `${originPlace.label} - ${selectedPlace.label} (${formattedDistance} ${postfix})`,
      value: distance,
      error: undefined,
      data: {
        distance,
        duration,
        fromPlaceId: originPlace.value,
        toPlaceId: selectedPlace.value,
        lat: geometry?.location?.lat,
        latitude: geometry?.location?.lat,
        lng: geometry?.location?.lng,
        longitude: geometry?.location?.lng,
      },
    });

    handleJumpToNextView();
  };

  const handleChange = async (
    name,
    selectedPlace: {
      label: string;
      value: string;
      featureCollection: GeoJsonFeatureCollection<GeoApifyPlaceSuggestionProperties>;
    },
  ) => {
    const hasFeatures = selectedPlace.featureCollection?.features?.length > 0;

    if (!hasFeatures) {
      onValueChange(question.reference, {
        label: '',
        value: 0,
        error: question.isRequired ? messages.placeRequired : undefined,
        data: {
          distance: 0,
          duration: 0,
        },
      });

      return;
    }

    const feature = selectedPlace.featureCollection.features[0];

    const shouldCalculateDistance = shouldUseOriginPlace && originPlace?.value;

    if (shouldCalculateDistance) {
      const result = await fetchDistances({
        destinations: [
          {
            type: 'coordinates',
            value: {
              lat: feature.geometry.coordinates[1],
              lng: feature.geometry.coordinates[0],
            },
          },
        ],
        origins: [
          {
            type: 'placeId',
            value: originPlace.value,
          },
        ],
      });

      const { distance, duration, formattedDistance, postfix } =
        formatDistanceMatrixResults(
          result,
          numberFormatting,
          systemOfMeasurement,
        );

      onValueChange(question.reference, {
        label: `${originPlace.label} - ${selectedPlace.label} (${formattedDistance} ${postfix})`,
        value: distance,
        error: undefined,
        data: {
          distance,
          duration,
          fromPlaceId: originPlace.value,
          toPlaceId: selectedPlace.value,
          lat: feature.geometry.coordinates[1],
          latitude: feature.geometry.coordinates[1],
          lng: feature.geometry.coordinates[0],
          longitude: feature.geometry.coordinates[0],
        },
      });
    } else {
      onValueChange(question.reference, {
        label: selectedPlace.label,
        value: selectedPlace.value,
        data: {
          lat: feature.geometry.coordinates[1],
          latitude: feature.geometry.coordinates[1],
          lng: feature.geometry.coordinates[0],
          longitude: feature.geometry.coordinates[0],
          postal_code: feature.properties.postcode || '',
          country: feature.properties.country || '',
          province: feature.properties.state || '',
          locality: feature.properties.district || '',
          route: feature.properties.street || '',
          sublocality: feature.properties.suburb || '',
          street_number: feature.properties.housenumber || '',
        },
        error: undefined,
      });
    }

    handleJumpToNextView();
  };

  // FF: placesViaGeoapify: Remove this wrapper, and use `handleChange` directly when removing flag
  const handleChangeWrapper = (name, value) => {
    if (placesViaGeoapify) {
      return handleChange(name, value);
    }

    return handleChangeOld(name, value);
  };

  return (
    <ElementStyleWrapper
      collection="questions"
      element={question}
      isError={!!error}
      isHidden={isHidden}
    >
      <ElementTitleWrapper collection="questions" element={question}>
        <ElementClassNameWrapper element={question}>
          <PlacePickerField
            className="cc__place-question-input"
            options={{
              language,
              restrictToCountries: place.shouldRestrictToCountries
                ? place.restrictToCountries
                : null,
            }}
            name="place"
            onChange={handleChangeWrapper}
            onFetchPlaceDetails={fetchPlaceDetails}
            onFetchPlaceSuggestions={fetchPlaceSuggestions} // FF: placesViaGeoapify: Remove this prop when remove flag
            placeholder={place.placeholder || undefined}
            $showInputIcon={question.showInputIcon}
            inputIcon={question.inputIcon}
          />

          <FieldError className="cc__element-error" isVisible={!!error}>
            {error}
          </FieldError>
        </ElementClassNameWrapper>
      </ElementTitleWrapper>
    </ElementStyleWrapper>
  );
};

export default Place;
