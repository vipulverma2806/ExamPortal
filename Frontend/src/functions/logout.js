 const logout = async () => {
    try {
      setLoading(true);
      const success = await axios.post(`${URL}/auth/logout`);

      toast.success("Logout Succesfully");
      navigate("/");
      return setLoading(false);
    } catch (err) {
      return console.log(err);
    }
  };
  export default logout;