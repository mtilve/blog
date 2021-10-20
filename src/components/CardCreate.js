import React from "react";
import Button from "react-bootstrap/Button";
import { useState} from "react";
import axios from "axios";
import { Formik, Field, Form } from "formik";
import CustomAlert from "./CustomAlert";

function CardCreate(props) {
  const baseURL = process.env.REACT_APP_POSTS_GET;
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = "El Título es requerido.";
    } else if (values.title.length > 100) {
      errors.title = "El Título no puede ser mayor a 100 caracteres.";
    }

    if (!values.body) {
      errors.body = "El Cuerpo es requerido.";
    } else if (values.body.length > 300) {
      errors.body = "El Cuerpo no puede ser mayor a 300 caracteres.";
    }
    return errors;
  };

  function createPost(title, body) {
    axios
      .post(baseURL, {
        title,
        body,
      })
      .then((response) => {
        if (response.status === 201) {
          setShowSuccess(true);
        } else {
          setShowError(true);
        }
      })
      .catch((error) => {
        setShowError(true);
      });
  }

  return (
    <>
      {showError && (
        <CustomAlert
          title="Error."
          error={true}
          body="Error al crear el post."
          show={showError}
          close={() => setShowError(false)}
        />
      )}
      {showSuccess && (
        <CustomAlert
          title="Éxito."
          error={false}
          body="Éxito al crear el post."
          show={showSuccess}
          close={() => setShowSuccess(false)}
        />
      )}
      <Formik
        enableReinitialize
        initialValues={{
          title: "",
          body: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            createPost(values.title, values.body);
          }, 500);
        }}
        validate={validateForm}
      >
        {(formik, isSubmitting) => (
          <Form>
            <div className="form-group w-responsive mx-auto m-2">
              <label htmlFor="title">Título</label>
              <Field
                name="title"
                className={
                  formik.touched.title && formik.errors.title
                    ? "form-control is-invalid"
                    : "form-control"
                }
                type="text"
              />
              {formik.touched.title && formik.errors.title ? (
                <div className="invalid-feedback">{formik.errors.title}</div>
              ) : null}
            </div>

            <div className="form-group w-responsive mx-auto m-2">
              <label htmlFor="body">Cuerpo</label>
              <Field
                as="textarea"
                rows="6"
                className={
                  formik.touched.body && formik.errors.body
                    ? "form-control is-invalid"
                    : "form-control"
                }
                name="body"
              />
              {formik.touched.body && formik.errors.body ? (
                <div className="invalid-feedback">{formik.errors.body}</div>
              ) : null}
            </div>

            <div className="form-group pt-3 w-responsive text-center mx-auto">
              <Button type="submit" variant="success" disabled={isSubmitting}>
                {isSubmitting ? "Espere por favor..." : "Crear"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default CardCreate;
