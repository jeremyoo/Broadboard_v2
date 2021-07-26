import * as fileCtrl from './api/file';

export const uploadImage = async (reduxAct, keyWord, type, imgUrl) => {
    const uploadAction = document.getElementById('uploadAction');
    const file = uploadAction.files[0];
    const formData = new FormData();
    formData.append('image', file);
    const path = await fileCtrl.upload(formData);
    const url = path.data.data.display_url;
    (type && imgUrl) && (type !== undefined && imgUrl !== undefined) ? 
    reduxAct({ form: `${type}`, key: `${keyWord}`, value: { imgUrl: url }}) : reduxAct({ key: `${keyWord}`, value: url}); 
  };