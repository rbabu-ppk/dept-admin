import axios from "axios";
// import { token } from "../tokens/authToken";
import { AddFormData } from "../types/deptAdminType";
import { useAuth } from "../App";

const url = "https://dev-admin.sunrises.io/api";

export const createData = async (data: AddFormData, token: string) => {
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

export const showIdData = async (id: string, token: string) => {
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

export const showData = async (token: string) => {
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

export const updateData = async (data: FormData, token: string) => {
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

export const deleteData = async (id: string, token: string) => {
  try {
    const response = await axios.delete(url + `/delete-departadmin?_id=${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
