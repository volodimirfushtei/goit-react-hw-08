import { Modal, Box, Typography, Button } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { motion } from "framer-motion";

const DeleteModal = ({ open, handleClose, handleDeleteContact }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <Box
          sx={(theme) => ({
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "rgba(0, 0, 0, 0.75)",
            border: "2px solid #000",
            boxShadow: theme.shadows[5],
            p: 4,
            borderRadius: 2,
          })}
        >
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            sx={{ display: "flex", alignItems: "center", marginLeft: 4 }}
          >
            <DeleteOutlinedIcon sx={{ marginRight: 2 }} color="secondary" />
            Confirm Deletion
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Do you want to delete this contact?
          </Typography>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={handleDeleteContact}
              color="primary"
              sx={{ ml: 2 }}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </motion.div>
    </Modal>
  );
};

export default DeleteModal;
