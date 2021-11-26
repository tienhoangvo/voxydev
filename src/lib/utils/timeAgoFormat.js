import TimeAgo from "javascript-time-ago";

const timeAgo = new TimeAgo("en-US");

const timeAgoFormat = (dateString = new Date().toString()) =>
  timeAgo.format(new Date(dateString));

export default timeAgoFormat;
