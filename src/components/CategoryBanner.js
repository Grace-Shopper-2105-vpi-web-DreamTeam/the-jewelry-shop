import React, {useEffect, useState} from "react";
import { Link, useHistory} from "react-router-dom";

import watchCategory from "../imgs/watchCategory.jpg";
import ringCategory from "../imgs/ringCategory.jpg";
import braceletCategory from "../imgs/braceletCategory.jpg";
import earringsCategory from "../imgs/earringsCategory.jpg";
import necklaceCategory from "../imgs/necklaceCategory.png";

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import ProductsByCategory from "./ProductsByCategory";

const images = [
  {
      url: `${watchCategory}`,
      title: 'WATCHES',
      id: 'watches',
      width: '20%',
  },
  {
      url: `${ringCategory}`,
      title: 'RINGS',
      id: 'rings',
      width: '20%',
  },
  {
      url: `${braceletCategory}`,
      title: 'BRACELETS',
      id: 'bracelets',
      width: '20%',
  },
  {
    url: `${earringsCategory}`,
    title: 'EARRINGS',
    id: 'earrings',
    width: '20%',
  },
  {
    url: `${necklaceCategory}`,
    title: 'NECKLACES',
    id: 'necklaces',
    width: '20%',
  },
];
const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
      zIndex: 1,
      '& .MuiImageBackdrop-root': {
          opacity: 0.15,
      },
      '& .MuiImageMarked-root': {
          opacity: 0,
      },
      '& .MuiTypography-root': {
          border: '4px solid currentColor',
      },
  },
}));
const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});
const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));
const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));
const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export default function CategoryBanner({category, setCategory}) {

  const [showSection, setShowSection] = useState({ watches: false, rings: false, bracelets: false, earrings: false, necklaces: false })

  const CustomLink = (props) => <Link to={to} {...props} />;

  let history = useHistory();

  function toWatches() {
    history.push("/jewelry/watches")
  }
    useEffect(() => {
        localStorage.setItem("category", JSON.stringify(category));   
    }, [category]);

  return (
    <div>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
                {images.map((image) => (
                    <ImageButton
                        focusRipple
                        key={image.title}
                        component={Link} to={`jewlery/${image.id}`}
                        onClick={() => {
                            const type = image.id
                            console.log("type", type)
                            if (type === 'watches') {
                                history.push("/jewelry/watches")
                                setCategory("watches");
                                setShowSection({ ...showSection, watches: true, rings: false, bracelets: false, earrings: false, necklaces: false });
                            } else if (type === 'rings') {
                                history.push("/jewelry/rings")
                                setCategory("rings");
                                setShowSection({ ...showSection, watches: false, rings: true, bracelets: false, earrings: false, necklaces: false })
                            } else if (type === 'bracelets') {
                              history.push("/jewelry/bracelets");
                              setCategory("bracelets");
                              setShowSection({ ...showSection, watches: false, rings: false, bracelets: true, earrings: false, necklaces: false })
                            } else if (type === 'earrings') {
                              history.push("/jewelry/earrings");
                              setCategory("earrings");
                              setShowSection({ ...showSection, watches: false, rings: false, bracelets: false, earrings: true, necklaces: false })
                            } else {
                              history.push("/jewelry/necklaces");
                              setCategory("necklaces");
                              setShowSection({ ...showSection, watches: false, rings: false, bracelets: false, earrings: false, necklaces: true })
                            }
                        }
                        }
                        style={{
                            width: image.width,
                        }}
                    >
                        <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                        <ImageBackdrop className="MuiImageBackdrop-root" />
                        <Image>
                            <Typography
                                component="span"
                                variant="subtitle1"
                                color="inherit"
                                sx={{
                                    position: 'relative',
                                    p: 4,
                                    pt: 2,
                                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                }}
                            >
                                {image.title}
                                <ImageMarked className="MuiImageMarked-root" />
                            </Typography>
                        </Image>
                    </ImageButton> 
                ))}
            </Box>
      </div> 
    )
};

