import axios from "axios";
// import { token } from "../tokens/authToken";
import { AddFormData } from "../types/deptAdminType";
import { useAuth } from "../App";

const baseUrl = "https://dev-admin.sunrises.io/api";

export const createData = async (data: AddFormData, token: string) => {
  try {
    const url = `${baseUrl}/create-departadmin`;
    const response = await axios.post(url, data, {
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
      baseUrl + `/get-departadmin-withid?_id=${id}`,
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
    const response = await axios.get(baseUrl + "/get-departadmins", {
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
    const response = await axios.put(baseUrl + `/edit-departadmin`, data, {
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
    const response = await axios.delete(
      baseUrl + `/delete-departadmin?_id=${id}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
