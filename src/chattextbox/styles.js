const styles = (theme) => ({
  sendBtn: {
    color: "#5167D0",
    cursor: "pointer",
    "&:hover": {
      color: "white",
    },
  },

  chatTextBoxContainer: {
    position: "absolute",
    bottom: "15px",
    left: "315px",
    boxSizing: "border-box",
    overflow: "auto",
    width: "calc(100% - 300px - 50px)",
  },

  chatTextBox: {
    width: "calc(100% - 25px)",
  },
});

export default styles;
