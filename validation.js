import * as Yup from "yup";

// https://github.com/jquense/yup
export const validationSchema = Yup.object().shape({
  author: Yup.string().required("Author is required"),
  title: Yup.string().required("Title is required"),
  series: Yup.string(),
  seriesSequenceNumber: Yup.number().positive().integer(),
  read: Yup.boolean().default(false),
  dateRead: Yup.date(),
  sourceUri: Yup.string(),
  coverImage: Yup.string()
});
