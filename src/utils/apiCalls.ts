import { async, reject } from "q";
import API from "../config/API";
import S3 from "../config/S3";
import { message } from "antd";
import { resolve } from "path";
import {
  AwsImageUploadResponseType,
  currentLoctionType,
} from "../shared/types/types";
const S3FileUpload = require("react-s3").default;
window.Buffer = window.Buffer || require("buffer").Buffer;

const GET = async (url: any, params: any) => {
  return new Promise(async (resolve, reject) => {
    fetch(API.BASE_URL + url, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        resolve(json);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const POST = async (url: any, body: any) => {
  return new Promise(async (resolve, reject) => {
    fetch(API.BASE_URL + url, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((json) => {
        resolve(json);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const PUT = async (url: any, body: any) => {
  return new Promise(async (resolve, reject) => {
    fetch(API.BASE_URL + url, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((json) => {
        resolve(json);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const DELETE = async (url: any) => {
  return new Promise(async (resolve, reject) => {
    fetch(API.BASE_URL + url, {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        resolve(json);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const DOCUMENT_UPLOAD = async (file: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (file) {
        message.loading({
          type: "loading",
          content: "Action in progress..",
          duration: 1,
        });
        const formDataFiles = new FormData();
        formDataFiles.append("file", file);
        const fileUpload = await fetch(`${API.BASE_URL}${API.FILE_UPLOAD}`, {
          method: "POST",
          body: formDataFiles,
        });
        if (fileUpload.ok) {
          const jsonResponse = await fileUpload.text();
          resolve(jsonResponse);
        } else {
          reject("Failed to upload file");
        }
      } else {
        reject("no file selected");
      }
    } catch (err) {
      reject(err);
    }
  });
};

const COMPRESS_IMAGE = async (file: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch(`${API.BASE_URL}${API.IMAGE_COMPRESS}`, {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          const jsonResponse: AwsImageUploadResponseType =
            await response.json();
          const obj = {
            ...jsonResponse,
            url: jsonResponse.Location,
            status: true,
          };
          resolve(obj);
        } else {
          let obj = {
            status: false,
            url: null,
          };
          reject(obj);
        }
      } else {
        reject("no file selected");
      }
    } catch (err) {
      reject(err);
    }
  });
};

const CURRENT_LOCATION = async (lat: number, long: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url =
        API.GET_LOCATION + `?latlng=${lat},${long}&key=${API.GGL_TOKEN}`;
      const locationObj: any = {};
      locationObj.latitude = lat;
      locationObj.longitude = long;
      if (lat && long) {
        fetch(url, {
          method: "get",
          headers: {
            Accept: "application/json",
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            if (response?.status == "OK") {
              response.results?.map((item: any) => {
                if (item.types?.includes("country")) {
                  locationObj.country = item?.address_components[0]?.long_name;
                }
                if (item.types?.includes("premise")) {
                  locationObj.premise = item?.formatted_address;
                }
                if (item.types?.includes("postal_code")) {
                  locationObj.postal_code =
                    item?.address_components[0]?.long_name;
                }
                if (item.types?.includes("administrative_area_level_1")) {
                  locationObj.state = item?.address_components[0]?.long_name;
                }
                if (item.types?.includes("administrative_area_level_3")) {
                  locationObj.district = item.formatted_address;
                }
                if (item.types?.includes("administrative_area_level_4")) {
                  locationObj.taluk = item?.address_components[0]?.long_name;
                }
                if (item.types?.includes("plus_code")) {
                  locationObj.plus_code = item.formatted_address;
                }
                if (item.types?.includes("street_address")) {
                  locationObj.street_address =
                    item?.address_components[0]?.long_name;
                }
                if (item.types?.includes("route")) {
                  locationObj.route = item.formatted_address;
                }
              });
              resolve({ data: locationObj, status: true });
            } else {
              reject("Failed to Get Location");
            }
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        reject("Please provide valid latitude and longitude");
      }
    } catch (err) {
      reject(err);
    }
  });
};

const AUTO_COMPLETE = async (value: string) => {
  return new Promise((resolve, reject) => {
    const url = `https://cors-anywhere.herokuapp.com/${API.GET_AUTOCOMPLETE}?input=${value}&key=${API.GGL_TOKEN}`;
    try {
      if (value) {
        fetch(url, {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
            cors: "cors",
          },
        })
          .then((response) => {
            console.log(response);
            return response.json();
          })
          .then((result) => resolve(result))
          .catch((error) => reject(error));
      }
    } catch (err) {
      reject(err);
    }
  });
};

export {
  GET,
  POST,
  PUT,
  DELETE,
  DOCUMENT_UPLOAD,
  COMPRESS_IMAGE,
  CURRENT_LOCATION,
  AUTO_COMPLETE,
};
