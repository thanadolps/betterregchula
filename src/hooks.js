import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { BACKEND_URL } from ".";

export function useUserInfo() {
    const res = useQuery("/user/info", { retry: false });
    return { ...res, data: res.error ? null : res.data }
}

export function useLogin() {
    const queryClient = useQueryClient()

    return useMutation(details => {
        return axios.post(
            BACKEND_URL + "/user/login",
            {
                student_id: details.stu_id.trim(),
                password: details.password.trim()
            },
            { withCredentials: true }
        )
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries("/user/info")
        }
    })
}

export function useLogout() {
    const queryClient = useQueryClient()

    return useMutation(() => {
        return axios.delete(
            BACKEND_URL + "/user/logout",
            { withCredentials: true }
        )
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries("/user/info")
        }
    })
}