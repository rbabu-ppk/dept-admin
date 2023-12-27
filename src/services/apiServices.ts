import axios from "axios";
import { token } from "../tokens/authToken";
import { AddFormData } from "../types/deptAdminType";

const url = "https://dev-admin.sunrises.io/api";

export const createData = async (data: AddFormData) => {
  try {
    const response = await axios.post(url + "/create-departadmin", data, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const showIdData = async (id: string) => {
  try {
    const response = await axios.get(
      url + `/get-departadmin-withid?_id=${id}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const showData = async () => {
  try {
    const response = await axios.get(url + "/get-departadmins", {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateData = async (data: FormData) => {
  try {
    const response = await axios.put(url + `/edit-departadmin`, data, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteData = async (id: string) => {
  try {
    const response = await axios.delete(url + `/delete/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
