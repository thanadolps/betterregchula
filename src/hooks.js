import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { BACKEND_URL } from ".";

export function useUserInfo() {
    const res = useQuery("/user/info", { retry: false });
    return res
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

export function useListSubjects() {
    return useQuery("/info/subjects")
}


export function usePendingSubject() {
    return useQuery("/register/pending")
}

export function useSetPendingSubject() {
    const queryClient = useQueryClient()

    return useMutation((subjectsID) => {
        return axios.put(
            BACKEND_URL + "/register/pending",
            subjectsID,
            { withCredentials: true }
        )
    }, {
        onMutate: async (subjectsID) => {
            await queryClient.cancelQueries("/register/pending")

            // Speculative Updating
            const subject_list = queryClient.getQueryData("/info/subjects");
            queryClient.setQueryData("/register/pending", subjects => {
                // Problem here is the GET response have more information in each subject than SET request
                // We'll recycle data as much as possible, both from old GET data and subjects cache
                let out = []
                for (let sid of subjectsID) {
                    // Find information about subject from old GET data (if it's exist) 
                    let old_data = subjects.find(x => x.subject.id == sid.subject_id);
                    // wow, this is disgusting
                    if (old_data === undefined) {
                        const data = old_data = subject_list.find(x => x.id == sid.subject_id);
                        if (data !== undefined) {
                            old_data = {
                                number: sid.number,
                                subject: {
                                    id: data.id,
                                    name_thai: data.name_thai,
                                    name_english: data.name_english,
                                    credit: data.credit,
                                    department: data.department
                                }
                            }
                        }
                    }

                    if (old_data !== undefined) {
                        out.push(old_data)
                    }
                }
                return out;
            }
            )
        },
        onSettled: () => {
            queryClient.invalidateQueries("/register/pending")
        }
    })
}

export function useRegisteredSubject() {
    return useQuery("/register/subjects")
}

export function useDropSubject() {
    const queryClient = useQueryClient()

    return useMutation((subject_id) => {
        return axios.delete(
            BACKEND_URL + "/register/subjects",
            { withCredentials: true, params: { subject_id } }
        )
    }, {
        onMutate: async (subject_id) => {
            await queryClient.cancelQueries("/register/subjects")

            queryClient.setQueryData(
                "/register/subjects",
                subjects => subjects.filter(s => s.subject_id != subject_id)
            )
        },
        onSuccess: () => {
            queryClient.invalidateQueries("/register/subjects")
        }
    })
}

export function useBuildings(q, n) {
    return useQuery(["/building", { q, n }])
}