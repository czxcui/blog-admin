export const formatDateToTimestamp = (dateStr: string) => {
  if (!dateStr) {
    return "";
  }
  let utcDate = new Date(dateStr + " UTC");
  let timestamp = utcDate.getTime();
  return timestamp;
};

export const formatTimestampToDate = (dateStr: string) => {
  if (!dateStr) {
    return "";
  }
  let utcDate = new Date(dateStr );

  
  return utcDate.toLocaleDateString().replace("/", "-").replace("/", "-");
};
