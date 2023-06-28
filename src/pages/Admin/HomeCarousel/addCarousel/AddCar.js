import React from "react";

const AddCar = ({ setPhoto, handleSubmit, setCategoryId, link, setLink }) => {
  // const [contacts, setContacts] = useState([
  //   {
  //     link: "",
  //     photo: "",
  //   },
  // ]);

  // useEffect(() => {
  //   const getCategories = async () => {
  //     const response = await fetch(
  //       `${process.env.REACT_APP_URL}/add/showCategory`
  //     );
  //     setContacts(await response.json());
  //   };
  //   getCategories();
  // }, []);

  return (
    <form encType="multipart/form-data">
      <label htmlFor="link">Add Link</label>
      <input
        type="url"
        name="link"
        id="link"
        required
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <label htmlFor="photo">Carousel Image</label>
      <input
        className="photoinp"
        type="file"
        accept="image/*"
        name="photo"
        id="photo"
        required
        onChange={(e) => setPhoto(e.target.files[0])}
      />
      <button type="button" onClick={handleSubmit}>
        Add Carousel
      </button>
    </form>
  );
};

export default AddCar;
