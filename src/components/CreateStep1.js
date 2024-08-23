import TextInput from "./TextInput";

const CreateStep1 = ({ data, handleChange }) => (
  <div className="w-full">
    <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
    <TextInput
      label="Full Name"
      name="fullName"
      value={data.fullName}
      onChange={handleChange}
    />

    <div className="flex gap-4 w-full">
      <TextInput
        label="Mobile Phone"
        name="mobilePhone"
        value={data.mobilePhone}
        onChange={handleChange}
      />
      <TextInput
        label="Email"
        name="email"
        value={data.email}
        onChange={handleChange}
      />
    </div>
  </div>
);

export default CreateStep1;
