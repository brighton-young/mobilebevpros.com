import { useEffect, useRef, useState } from 'react';

import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import SignatureCanvas from 'react-signature-canvas';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { useSelectedView } from '../../CalculatorState';
import useCreateUpload from '../../effects/useCreateUpload';
import useGetUploadUrl from '../../effects/useGetUploadUrl';
import useRemoveUpload from '../../effects/useRemoveUpload';
import { isUploadingFileState } from '../../recoil/isUploadingState';
import { colors } from '../../styles';
import getInputStyleVariables from '../../styles/styleVariables/inputStyleVariables';
import useStyles from '../../styles/useStyles';
import { getFileName, uploadFile } from '../FileUploadField/helpers';
import TextLink from '../TextLink';

const WIDTH = '300px';
const HEIGHT = '175px';

const SignatureWrapper = styled.div`
  text-align: right;
  width: ${WIDTH};
  max-width: 100%;
  background: ${colors.white};
`;

type SignatureFieldProps = {
  isHidden?: boolean;
  name: string;
  value: any;
  onChange: (name: string, value: any) => void;
};

const SignatureField = ({
  isHidden,
  name,
  value,
  onChange,
}: SignatureFieldProps) => {
  const canvasEl = useRef(null);
  const signatureWrapperEl = useRef(null);
  const setIsUploadingFile = useSetRecoilState(isUploadingFileState);
  const [uploadedFileId, setUploadedFileId] = useState(null);
  const [isPristine, setPristine] = useState(true);
  const [width, setWidth] = useState(WIDTH);

  const createUpload = useCreateUpload();
  const getUploadUrl = useGetUploadUrl();
  const removeUpload = useRemoveUpload();

  const selectedViewIndex = useSelectedView();

  useEffect(() => {
    if (isHidden || signatureWrapperEl.current === null) return;

    // if parent width is 0 or larger than WIDTH we default to WIDTH.
    setWidth(Math.min(signatureWrapperEl.current.width, WIDTH) || WIDTH);
  }, [isHidden, selectedViewIndex]);

  useEffect(() => {
    if (isEmpty(value) && !isPristine) {
      handleSetPristine({ deleteFile: false });
    }
  }, [value]);

  const handleChange = async () => {
    try {
      const dataURLtoBlob = (await import('blueimp-canvas-to-blob')).default;

      if (
        !canvasEl.current ||
        !canvasEl.current.toDataURL ||
        canvasEl.current.isEmpty()
      ) {
        return;
      }

      setPristine(false);
      setIsUploadingFile({ [name]: true });

      // convert canvas to blob
      const dataUrl = canvasEl.current.toDataURL();
      const file = dataURLtoBlob(dataUrl);

      const fileName = getFileName('Signature.png');
      const fileType = 'image/png';

      file.name = fileName;

      const uploadUrlRes = await getUploadUrl({ fileName, fileType });
      const data = await uploadFile({ file, uploadUrlRes });

      const { uploadId } = await createUpload({
        size: data.size,
        url: data.url,
        name: data.name,
      });

      onChange(name, {
        ...data,
        name: fileName,
        type: fileType,
        uploadId,
      });

      setIsUploadingFile({ [name]: false });
      setUploadedFileId(uploadId);
    } catch (error) {
      deleteUpload();
    }
  };

  const debouncedHandleChange = debounce(handleChange, 3000);

  const handleOnEnd = () => {
    setIsUploadingFile({ [name]: true });
    debouncedHandleChange();
  };

  const handleSetPristine = async ({ deleteFile = false }) => {
    canvasEl.current.clear();
    onChange(name, null);

    setPristine(true);

    if (deleteFile && uploadedFileId) {
      try {
        await removeUpload({ uploadId: uploadedFileId });
      } catch (error) {
        // no-op
      }
    }
  };

  const deleteUpload = async () => {
    if (uploadedFileId) {
      try {
        await removeUpload({ uploadId: uploadedFileId });
      } catch (error) {
        // no-op
      }
    }
  };

  const inputStyles = useStyles({
    prefix: 'input',
    getVariables: getInputStyleVariables,
  });

  return (
    <SignatureWrapper ref={signatureWrapperEl}>
      <SignatureCanvas
        ref={canvasEl}
        penColor={colors.darkGray}
        canvasProps={{
          width,
          height: HEIGHT,
          style: {
            border: `1px solid ${colors.mediumGray}`,
            borderColor: inputStyles.borderColor || colors['gray-300'],
            borderRadius: inputStyles.borderRadius || '4px',
            borderStyle: inputStyles.borderStyle || 'solid',
            borderWidth: inputStyles.borderWidth || '1px',
          },
        }}
        onEnd={handleOnEnd}
      />
      {!isPristine && (
        <TextLink
          component="button"
          type="button"
          onClick={() => {
            return handleSetPristine({ deleteFile: true });
          }}
        >
          Clear
        </TextLink>
      )}
    </SignatureWrapper>
  );
};

export default SignatureField;
