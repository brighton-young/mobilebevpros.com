import { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';

import { CalculatorSettings, GeoJsonFeatureCollection } from '@cc/types';

import { useCanvasSize, useFeatureFlags } from '../../../CalculatorState';
import ElementClassNameWrapper from '../../../components/ElementClassNameWrapper';
import ElementStyleWrapper from '../../../components/ElementStyleWrapper';
import ElementTitleWrapper from '../../../components/ElementTitleWrapper';
import FieldError from '../../../components/FieldError';
import Label from '../../../components/Label';
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

const Grid = styled.div`
  display: grid;
  align-items: center;
  row-gap: 0.5rem;
  column-gap: 1rem;

  grid-template-columns: ${({ isMobile }) => {
    return `repeat(${isMobile ? 1 : 2}, minmax(0, 1fr));`;
  }};
`;

type PlacesProps = {
  error: string;
  isHidden: boolean;
  onValueChange: HandleValueChange;
  question: PlacesElement;
  settings: CalculatorSettings;
  valueObject: ValueObject<{
    distance: number;
    duration: number;
    fromPlaceId: string;
    toPlaceId: string;
  }>;
};

export type PlacesElement = {
  type: 'places';
  _id: string;
  reference: string;
  shouldAddVisibilityLogic: boolean;
  places: {
    fromLabel?: string;
    fromPlaceholder?: string;
    fromRestrictToCountries?: string[];
    fromShouldRestrictToCountries?: boolean;
    toLabel?: string;
    toPlaceholder?: string;
    toRestrictToCountries?: string[];
    toShouldRestrictToCountries?: boolean;
  };
};

type PlaceState = {
  placeId?: string; // FF: placesViaGeoapify: Remove placeId from state
  coordinates?: {
    lat: number;
    lng: number;
  };
  value?: string;
};

const Places = ({
  error,
  isHidden,
  settings,
  onValueChange,
  question,
}: PlacesProps) => {
  const { language, messages, numberFormatting, systemOfMeasurement } =
    settings;

  const fetchDistances = useFetchDistances();
  const fetchPlaceDetails = useFetchPlaceDetails();
  const fetchPlaceSuggestions = useFetchPlaceSuggestions();

  const { handleJumpToNextView } = useJumpToNextView({ question });

  const [fromPlace, setFromPlace] = useState<PlaceState>({});
  const [toPlace, setToPlace] = useState<PlaceState>({});

  const { isMobile } = useCanvasSize();

  const isTouched = useRef(false);

  // FF: placesViaGeoapify: Remove this function when remove flag
  const handleFetchDistancesOld = async () => {
    if (fromPlace?.placeId && toPlace?.placeId) {
      try {
        const result = await fetchDistances({
          destinations: [
            {
              type: 'placeId',
              value: toPlace.placeId,
            },
          ],
          origins: [
            {
              type: 'placeId',
              value: fromPlace.placeId,
            },
          ],
        });

        const { distance, duration, formattedDistance, postfix } =
          formatDistanceMatrixResults(
            result,
            numberFormatting,
            systemOfMeasurement,
          );

        onValueChange(
          question.reference,
          {
            label: `${fromPlace.value} - ${toPlace.value} (${formattedDistance} ${postfix})`,
            value: distance,
            error: undefined,
            data: {
              distance,
              duration,
              fromPlaceId: fromPlace.placeId,
              toPlaceId: toPlace.placeId,
            },
          },
          isTouched.current,
        );

        handleJumpToNextView();
      } catch (err) {
        console.error(err);
      }
    } else {
      onValueChange(
        question.reference,
        {
          label: '',
          value: 0,
          error: question.isRequired ? messages.placesRequired : undefined,
          data: {
            distance: 0,
            duration: 0,
          },
        },
        isTouched.current,
      );
    }
  };

  const handleFetchDistances = async () => {
    if (fromPlace?.coordinates && toPlace?.coordinates) {
      try {
        const result = await fetchDistances({
          destinations: [
            {
              type: 'coordinates',
              value: toPlace.coordinates,
            },
          ],
          origins: [
            {
              type: 'coordinates',
              value: fromPlace.coordinates,
            },
          ],
        });

        const { distance, duration, formattedDistance, postfix } =
          formatDistanceMatrixResults(
            result,
            numberFormatting,
            systemOfMeasurement,
          );

        onValueChange(
          question.reference,
          {
            label: `${fromPlace.value} - ${toPlace.value} (${formattedDistance} ${postfix})`,
            value: distance,
            error: undefined,
            data: {
              distance,
              duration,
              fromPlaceId: fromPlace.placeId,
              toPlaceId: toPlace.placeId,
            },
          },
          isTouched.current,
        );

        handleJumpToNextView();
      } catch (err) {
        console.error(err);
      }
    } else {
      onValueChange(
        question.reference,
        {
          label: '',
          value: 0,
          error: question.isRequired ? messages.placesRequired : undefined,
          data: {
            distance: 0,
            duration: 0,
          },
        },
        isTouched.current,
      );
    }
  };

  useEffect(() => {
    // FF: placesViaGeoapify: Remove this if statement when remove flag
    if (placesViaGeoapify) {
      handleFetchDistances();
    } else {
      handleFetchDistancesOld();
    }
  }, [fromPlace, toPlace]);

  // FF: placesViaGeoapify: Remove this function when remove flag
  const handleChangeOld = (name, option) => {
    isTouched.current = true;

    if (name === 'fromPlace') {
      if (!option) {
        setFromPlace({});

        return;
      }
      setFromPlace({
        value: option.label,
        placeId: option.value,
      });
    }

    if (name === 'toPlace') {
      if (!option) {
        setToPlace({});

        return;
      }

      setToPlace({
        value: option.label,
        placeId: option.value,
      });
    }
  };

  const handleChange = (
    name,
    option: {
      label: string;
      value: string;
      featureCollection: GeoJsonFeatureCollection;
    },
  ) => {
    isTouched.current = true;

    if (name === 'fromPlace') {
      if (!option) {
        setFromPlace({});

        return;
      }
      setFromPlace({
        value: option.label,
        coordinates: {
          lat: option.featureCollection.features[0].geometry.coordinates[1],
          lng: option.featureCollection.features[0].geometry.coordinates[0],
        },
      });
    }

    if (name === 'toPlace') {
      if (!option) {
        setToPlace({});

        return;
      }

      setToPlace({
        value: option.label,
        coordinates: {
          lat: option.featureCollection.features[0].geometry.coordinates[1],
          lng: option.featureCollection.features[0].geometry.coordinates[0],
        },
      });
    }
  };

  const { placesViaGeoapify } = useFeatureFlags();

  // FF: placesViaGeoapify: Remove this wrapper when remove flag
  const handleChangeWrapper = (name, option) => {
    if (placesViaGeoapify) {
      handleChange(name, option);
    } else {
      handleChangeOld(name, option);
    }
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
          <Grid isMobile={isMobile}>
            <div>
              <Label htmlFor="fromPlace">{question.places.fromLabel}</Label>
              <PlacePickerField
                className="cc__places-question-fromPlace-input"
                options={{
                  language,
                  restrictToCountries: question.places
                    .fromShouldRestrictToCountries
                    ? question.places.fromRestrictToCountries
                    : null,
                }}
                name="fromPlace"
                onChange={handleChangeWrapper}
                onFetchPlaceDetails={fetchPlaceDetails} // FF: placesViaGeoapify: Remove this prop when remove flag
                onFetchPlaceSuggestions={fetchPlaceSuggestions}
                placeholder={question.places.fromPlaceholder}
                $showInputIcon={question.showInputIcon}
                inputIcon={question.inputIcon}
              />
            </div>
            <div>
              <Label htmlFor="toPlace">{question.places.toLabel}</Label>
              <PlacePickerField
                className="cc__places-question-toPlace-input"
                options={{
                  language,
                  restrictToCountries: question.places
                    .toShouldRestrictToCountries
                    ? question.places.toRestrictToCountries
                    : null,
                }}
                name="toPlace"
                onChange={handleChangeWrapper}
                onFetchPlaceDetails={fetchPlaceDetails} // FF: placesViaGeoapify: Remove this prop when remove flag
                onFetchPlaceSuggestions={fetchPlaceSuggestions}
                placeholder={question.places.toPlaceholder}
                $showInputIcon={question.showInputIcon}
                inputIcon={question.inputIcon}
              />
            </div>
          </Grid>

          <FieldError className="cc__element-error" isVisible={!!error}>
            {error}
          </FieldError>
        </ElementClassNameWrapper>
      </ElementTitleWrapper>
    </ElementStyleWrapper>
  );
};

export default Places;
