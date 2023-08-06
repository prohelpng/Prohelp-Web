import useSWR from "swr";

interface Props {
  email: string;
}

export default function useProfile() {
  let authMail: string = localStorage.getItem("auth-email") ?? "";
  const { data, mutate, error } = useSWR("/user/" + authMail);

  // console.log('response', error);
  const loading = !data && !error;
  const loggedOut =
    (error && error?.message === "No token provided.") ||
    error?.response?.status === 401 ||
    error?.response?.status === 403 ||
    error?.response?.data?.message === "No user found!" ||
    data?.accountStatus === "frozen";

  return {
    loading,
    loggedOut,
    data,
    mutate,
  };
}
