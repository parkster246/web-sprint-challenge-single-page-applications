import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Route, Link } from "react-router-dom";
import Confirm from "./Confirm";

const Form = (props => {
  const defaultState = {
    size: "",
    cheese: "",
    sauce: "",
    crust: "",
    topp1: "",
    topp2: "",
    topp3: "",
    topp4: "",
    instructions: "",
   
  };

  const [formState, setFormState] = useState({
    defaultState,
  });
  const [errors, setErrors] = useState({
    defaultState,
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const formSchema = Yup.object().shape({
    size: Yup.string().required("Must choose a size"),
    cheese: Yup.string().required("Must specify choice"),
    sauce: Yup.string().required("Must choose a sauce"),
    crust: Yup.string().required("Must choose a crust"),
    topp1: Yup.string(),
    topp2: Yup.string(),
    topp3: Yup.string(),
    topp4: Yup.string(),
    instructions: Yup.string(),
    name: Yup.string()
      .required("Must include a Name.")
      .min(2, "Your name cant be that short!"),
    email: Yup.string()
      .email("Must be a valid email address.")
      .required("Must include and email address"),
  });
  const [post, setPost] = useState([]);

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => setButtonDisabled(!valid));
  }, [formState]);

  const inputChange = (e) => {
    e.persist();

    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormState({
      ...formState,
      [e.target.name]: value,
    });

    Yup.reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({ ...errors, [e.target.name]: "" });
      })
      .catch((err) => {
        setErrors({ ...errors, [e.target.name]: err.errors[0] });
      });
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const formSubmit = (e) => {
      console.log('clicked')
    e.preventDefault();
    console.log("submitted");
    axios
      .post("https://reqres.in/api/users", formState)
      .then((res) => {
          console.log("Form submitted successfully!", res.data);
        setPost(res.data);
      })
      .catch((err) => console.log(err));
  };


  return (
    <div>
      <form onSubmit={formSubmit}>
        <label>
          <h3>Choice of Size</h3>
        </label>
        <select id="sizeInput" name="size" onChange={inputChange}>
          <option>Select</option>
          <option value="Personal">Personal</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
          <option value="Family">Family</option>
        </select>
      </form>
      <label>
        <h3>Cheese</h3>
      </label>
      <select id="cheeseInput" name="cheese" onChange={inputChange}>
        <option>Select</option>
        <option value="Mozzarella">Mozzarella</option>
        <option value="Cheddar">Cheddar</option>
        <option value="Parmesan">Parmesan</option>
        <option value="Three Cheese">Three Cheese</option>
        <option value="Vegan">Vegan</option>
        <option value="No Cheese">No Cheese</option>
      </select>
      <br></br>
      <br></br>

      <label>
        <h3>Sauce</h3>
      </label>
      <select id="sauceInput" name="sauce" onChange={inputChange}>
        <option>Select</option>
        <option value="Marinara">Marinara</option>
        <option value="Spicy Marinara">Spicy Marinara</option>
        <option value="Alfredo">Alfredo</option>
        <option value="Buffulo">Buffulo</option>
        <option value="Pesto">Pesto</option>
        <option value="Barbeque">Barbeque</option>
      </select>
      <br></br>
      <br></br>

      <label>
        <h3>Crust</h3>
      </label>
      <select id="crustInput" name="crust" onChange={inputChange}>
        <option>Select</option>
        <option value="Plain">Plain</option>
        <option value="Butter">Butter</option>
        <option value="Butter cheese">Butter cheese</option>
        <option value="Stuffed">Stuffed</option>
        <option value="Garlic">Garlic</option>
        <option value="Cajun">Cajun</option>
        <option value="Cinnamon">Cinnamon</option>
        <option value="Gluten Free">Gluten Free</option>
      </select>
      <br></br>
      <br></br>

      <form>
        <h3>Toppings</h3>
        <label>
          pepperoni
          <input
            type="checkbox"
            name="topp1"
            id="pepperoniInput"
            error={errors}
            value="pepperoni"
            checked={formState.value}
            onChange={inputChange}
          />
        </label>
        <br></br>
        <br></br>
        <label>
          green peppers
          <input
            type="checkbox"
            name="gpeps"
            id="gpepsInput"
            error={errors}
            value="green peppers"
            checked={formState.value}
            onChange={inputChange}
          />
        </label>
        <br></br>
        <br></br>
        <label>
          onions
          <input
            type="checkbox"
            name="topp3"
            id="onionsInput"
            error={errors}
            value="onions"
            checked={formState.value}
            onChange={inputChange}
          />
        </label>
        <br></br>
        <br></br>
        <label>
          spinach
          <input
            type="checkbox"
            name="topp4"
            id="spinachInput"
            error={errors}
            value="spinach"
            checked={formState.value}
            onChange={inputChange}
          />
        </label>
        <br></br>
        <br></br>
        <h3>Special Instructions</h3>
        <label>
          type here
          <input
            type="text"
            name="instructions"
            id="specialInput"
            placeholder="Ex. Well Done"
            error={errors}
            checked={formState.instructions}
            onChange={inputChange}
          />
        </label>
        <br></br>
        <br></br>
        <h3>Contact Info</h3>
        {/* <label htmlFor="nameInput">
          Name
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            id="nameInput"
            error={errors}
            value={formState.name}
            onChange={inputChange}
          />
        </label> */}
        {/* <br></br>
        <br></br>
        <label htmlFor="mailInput">
          Email
          <input
            type="text"
            placeholder="Email"
            name="email"
            id="emailInput"
            error={errors}
            value={formState.email}
            onChange={inputChange}
          />
        </label> */}
        <br></br>
        <br></br>
        
        <button onClick={formSubmit}>

            Confirm
    
        </button>
        <Route exact path="/confirm" component={Confirm} />

      </form>


      <div>
        <div>
       <Form
        post={post} setPost={setPost}
        />
            <h3>Order</h3>
        {post.map(order => (
            <div>
        <p>size: {order.size};</p>
        <p>cheese: {order.cheese};</p>
<p>sauce: {order.sauce}</p>
<p>crust: {order.crust}</p> 
<p>instructions: {order.instructions}</p>
        </div>
        ))}
        </div>
      </div>
    </div>
  );
}
)

export default Form;
