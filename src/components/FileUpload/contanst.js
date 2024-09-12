//  图片的所以格式
const imgTypes =
  "bmp,jpg,jpeg, png,tif,gif,pcx,tga,exif,fpx,svg,psd,cdr,pcd,dxf,ufo,eps,ai,raw,wmf,webp,avif,apng";
//  文件的所以格式
const docTypes = "doc,docx,xls,ppt,txt,pdf,pptx";
const videoTypes = "mp4,ogg,flv,avi,wmv,rmvb";
export const isImg = (str) => imgTypes.indexOf(str.toLowerCase()) !== -1;
export const isDoc = (str) => docTypes.indexOf(str.toLowerCase()) !== -1;
export const isVideo = (str) => videoTypes.indexOf(str.toLowerCase()) !== -1;
