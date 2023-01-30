import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Entry, FormState } from './type';
import { addEntry, clearSearch, filterEntries } from './formSlice';

const FormComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { filteredEntries, searchTerm, filterOption } = useSelector(
    (state: { form: FormState }) => state.form
  );

  const handleSubmit = (values: Entry) => {
    dispatch(addEntry(values));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterEntries({ searchTerm: e.target.value, filterOption }));
  };

  const clearSearchCb = () => {
    dispatch(clearSearch());
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    message: Yup.string()
      .max(250, 'Message must be less than 250 characters')
      .required('Message is required'),
  });

  return (
    <div className="max-w-sm mx-auto">
      <Formik
        initialValues={{ name: '', email: '', message: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, handleChange, values, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="w-full border border-gray-400 p-2"
                id="name"
                type="text"
                name="name"
                onChange={handleChange}
                value={values.name}
              />
              {errors.name && touched.name && (
                <div className="text-red-500 text-sm mt-2">{errors.name}</div>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full border border-gray-400 p-2"
                id="email"
                type="email"
                name="email"
                onChange={handleChange}
                value={values.email}
              />
              {errors.email && touched.email && (
                <div className="text-red-500 text-sm mt-2">{errors.email}</div>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                className="w-full border border-gray-400 p-2"
                id="message"
                name="message"
                onChange={handleChange}
                value={values.message}
              />
              {errors.message && touched.message && (
                <div className="text-red-500 text-sm mt-2">
                  {errors.message}
                </div>
              )}
            </div>
            <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded">
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <div className="mt-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search"
          className="w-full border border-gray-400 p-2 mb-2"
        />

        <button
          onClick={clearSearchCb}
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded mb-2"
        >
          Clear Search
        </button>
        <div className="mb-4">
          <label htmlFor="filterOption">
            Filter by:
            <select
              id="filterOption"
              value={filterOption}
              onChange={(e) =>
                dispatch(
                  filterEntries({
                    searchTerm,
                    filterOption: e.target.value as
                      | 'name'
                      | 'email'
                      | 'message',
                  })
                )
              }
            >
              <option value="email">Email</option>
              <option value="name">Name</option>
              <option value="message">Message</option>
            </select>
          </label>
        </div>

        <table className="w-full text-left table-collapse">
          <thead>
            <tr className="bg-indigo-500 text-white">
              <th className="text-sm font-medium p-2">Name</th>
              <th className="text-sm font-medium p-2">Email</th>
              <th className="text-sm font-medium p-2">Message</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.map((entry, index) => (
              <tr key={index} className="border-b border-gray-400">
                <td className="p-2">{entry.name}</td>
                <td className="p-2">{entry.email}</td>
                <td className="p-2">{entry.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormComponent;
