import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { addField } from "./redux/fieldsSlice";
import { useFormik } from "formik";
import {
  Modal,
  Button,
  TextField,
  Select,
  MenuItem,
  InputBase,
  InputLabel,
  FormControl,
  Grid,
} from "@mui/material";
const useStyles = makeStyles(() => ({
  canvas: {
    padding: "20px",
    border: "1px solid black",
    borderRadius: "5px",
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
  fieldItem: {
    marginBottom: "10px",
  },
  mopdal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    padding: "20px",
    width: "400px",
  },
}));

const Canvas = () => {
  const classes = useStyles();
  const dispath = useDispatch();
  const fields = useSelector((state) => state.fields);

  const [open, setOpen] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      fieldName: "",
      fieldTtpe: "",
      offsetFrom: "",
      offsetTo: "",
      description: "",
      arraySize: 0,
    },
    onSubmit: (values) => {
      values.arraySize = values.offsetTo - values.offsetFrom + 1;
      dispath(addField(values));
      setOpen(false);
      saveToDatabase(values);
    },
  });
  const saveToDatabase = async (fieldData) => {
    try {
      const response = await fetch("http://localhost:5000/saveField", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fieldData),
        
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error.message);
    }
  
  };

  return (
    <div className={classes.canvas} onClick={() => setOpen(true)}>
      {fields.map((item, index) => (
        <div key={index} className={classes.fieldItem}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              {item.fieldName}
            </Grid>
            <Grid
              item
              xs={4}
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <div>{item.offsetFrom}:</div>
              <div>{item.offsetTo}</div>

              <div>({item.arraySize})</div>
            </Grid>
          </Grid>
        </div>
      ))}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={classes.mopdal}
      >
        <div className={classes.paper}>
          <form onSubmit={formik.handleSubmit}>
            <h2>Add Field</h2>
            <TextField
              fullWidth
              id="fieldName"
              name="fieldName"
              label="Field Name"
              value={formik.values.fieldName}
              onChange={formik.handleChange}
              error={
                formik.touched.fieldName && Boolean(formik.errors.fieldName)
              }
              helperText={formik.touched.fieldName && formik.errors.fieldName}
            />
            <FormControl fullWidth style={{ marginTop: "20px" }}>
              <InputLabel id="demo-simple-select-label">Field Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formik.values.fieldTtpe}
                label="Field Type"
                onChange={formik.handleChange}
                name="fieldTtpe"
              >
                <MenuItem value={'string'}>String</MenuItem>
                <MenuItem value={'number'}>Number</MenuItem>
              </Select>
            </FormControl>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  style={{ marginTop: "20px" }}
                  fullWidth
                  id="offsetFrom"
                  name="offsetFrom"
                  label="Offset From"
                  value={formik.values.offsetFrom}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.offsetFrom &&
                    Boolean(formik.errors.offsetFrom)
                  }
                  helperText={
                    formik.touched.offsetFrom && formik.errors.offsetFrom
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  style={{ marginTop: "20px" }}
                  fullWidth
                  id="offsetTo"
                  name="offsetTo"
                  label="Offset To"
                  value={formik.values.offsetTo}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.offsetTo && Boolean(formik.errors.offsetTo)
                  }
                  helperText={formik.touched.offsetTo && formik.errors.offsetTo}
                />
              </Grid>
            </Grid>
            <TextField
              style={{ marginTop: "20px" }}
              fullWidth
              id="description"
              multiline
              rows={10}
              maxRows={10}
              name="description"
              label="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
            <br />
            <div style={{ marginTop: "20px", display: "flex" }}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <Button type="submit" variant="contained" color="primary">
                    Save
                  </Button>
                </Grid>
              </Grid>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};
export default Canvas;
