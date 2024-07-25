import getRandomId from '@cc/shared/utils/getRandomId';

const readDataUrl = (file, callback) => {
  const reader = new window.FileReader();

  reader.onloadend = () => {
    callback(reader.result);
  };

  reader.readAsDataURL(file);
};

export const getBase64Files = (files) => {
  const promises = files.map((file) => {
    return new Promise((resolve) => {
      readDataUrl(file, (res) => {
        const { name, size, type } = file;

        const [prefix, base64] = res.split(',');
        const newType = type || prefix.split(';')[0];

        resolve({
          base64,
          name,
          size,
          type: newType,
        });
      });
    });
  });

  return Promise.all(promises);
};

export const getUploadIcon = () => {
  return `<svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 64 64" xml:space="preserve">
      <g id="_x36_4px_boxes">
        <rect fill="none" width="64" height="64"/>
      </g>
      <g id="Production">
        <g>
          <polygon fill="#565D64" points="51,45 51,51 13,51 13,45 11,45 11,53 53,53 53,45     "/>
          <polygon fill="#565D64" points="31,15.5146 31,46 33,46 33,15.5146 41.8062,24.3208 43.2202,22.9067 32,11.6865 20.7798,22.9067
            22.1938,24.3208     "/>
        </g>
      </g>
    </svg>`;
};

const insertItem = (array, action) => {
  const newArray = array.slice();
  newArray.push(...action.values);
  return newArray;
};

const removeItem = (array, action) => {
  const newArray = array.slice();
  const index = array.findIndex((file) => {
    return file._id === action.values._id || file.key === action.values.key;
  });
  newArray.splice(index, 1);
  return newArray;
};

const updateItem = (array, action) => {
  const index = array.findIndex((file) => {
    return file._id === action.values._id || file.key === action.values.key;
  });

  if (index === -1) return array;

  const newArray = array.slice();

  newArray[index] = {
    ...newArray[index],
    ...action.values,
  };

  return newArray;
};

export const filesReducer = (state, action) => {
  switch (action.type) {
    case 'set': {
      return action.values;
    }
    case 'add': {
      if (state && state.length > 0) {
        return insertItem(state, action);
      }

      return action.values;
    }
    case 'update': {
      return updateItem(state, action);
    }
    case 'delete': {
      return removeItem(state, action);
    }
    case 'clear': {
      return [];
    }
    default:
      return state;
  }
};

export const getFileName = (name) => {
  const parts = name.split('.');
  const extension = parts.pop();
  const fileName = parts.join('.');

  return [fileName, '-', getRandomId(), '.', extension].join('');
};

export const uploadFile = async ({ file, uploadUrlRes }) => {
  const { url, fields } = uploadUrlRes;

  const formData = new FormData();

  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value);
  });

  formData.append('file', file);

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    return {
      name: file.name,
      size: file.size,
      type: file.type,
      url: `${url}/${fields.key}`,
      preview: file.preview,
      key: file.key,
    };
  }

  throw new Error(`${response.status} - ${response.statusText}`);
};
