import React from "react";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Field, Form } from "formik";
import CustomAlert from "./CustomAlert";

function CardEdit(props) {
  const history = useHistory();
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const baseURL = process.env.REACT_APP_POSTS_GET + "/" + props.detail;
  const [post, setPost] = useState({});

  useEffect(() => {
    axios.get(`${baseURL}`).then((response) => {
      if (!response.data && !response.data.id) {
        history.push("/home");
      }
      setPost(response.data);
    });
  }, []);

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

  function updatePost(title, body) {
    axios
      .put(baseURL, {
        title,
        body,
      })
      .then((response) => {
        if (response.status === 200) {
          setShowSuccess(true);
        } else {
          setShowError(true);
        }
      })
      .catch((error) => {
        setShowError(true);
      });
  }

  let form;
  if (props.editar) {
    form = (
      <Formik
        enableReinitialize
        initialValues={{
          title: post.title ? post.title : "",
          body: post.body ? post.body : "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            updatePost(values.title, values.body);
          }, 1000);
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
                {isSubmitting ? "Espere por favor..." : "Editar"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    );
  } else {
    form = (
      <Formik
        enableReinitialize
        initialValues={{
          title: post.title ? post.title : "",
          body: post.body ? post.body : "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            updatePost(values.title, values.body);
          }, 500);
        }}
        validate={validateForm}
      >
        {(formik, isSubmitting) => (
          <Form>
            <div className="form-group w-responsive mx-auto m-2">
              <label htmlFor="title">Título</label>
              <Field
                readOnly
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
                readOnly
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
          </Form>
        )}
      </Formik>
    );
  }

  return (
    <>
      {showError && (
        <CustomAlert
          title="Error."
          error= {true}
          body="Error al editar el post."
          show={showError}
          close={() => setShowError(false)}
        />
      )}
      {showSuccess && (
        <CustomAlert
          title="Éxito."
          error= {false}
          body="Éxito al editar el post."
          show={showSuccess}
          close={() => setShowSuccess(false)}
        />
      )}
      {form}
    </>
  );
}

export default CardEdit;
