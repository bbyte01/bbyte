import * as React from "react";
import { Dialog } from "@mui/material";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./style.css";

export default function Screenshotdialog({ open, handleClose, list }) {
  //   const [open, setOpen] = React.useState(false);
  //   const handleOpen = () => setOpen(true);
  //   const handleClose = () => setOpen(false);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            background: "transparent",
          },
        }}
      >
        <OwlCarousel
          className="owl-theme"
          loop
          nav
          margin={10}
          dots={false}
          responsive={{
            0: { items: 1 },
            600: { items: 1 },
            1000: { items: 1 },
          }}
        >
          {list.map((i) => (
            <div class="item" key={i.files}>
              <img
                src={i?.files}
                height="100%"
                width="100%"
                style={{ objectFit: "contain" }}
              />
            </div>
          ))}
        </OwlCarousel>
      </Dialog>
    </div>
  );
}
