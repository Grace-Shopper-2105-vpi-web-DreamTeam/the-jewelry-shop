import React, {useEffect} from "react";
import { Link} from "react-router-dom";

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



export default function CategoryBanner({category, setCategory}) {

    useEffect(() => {
        localStorage.setItem("category", JSON.stringify(category));   
    }, [category]);

  return (
        <ImageList sx={{ width: 1000, height: 250 }} cols={5} style={{justifyContent: "center"}}>
          <ImageListItem key="1" >
              <img
                src={`${watchCategory}?w=248&fit=crop&auto=format`}
                srcSet={`${watchCategory}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt="click to shop watches"
                loading="lazy"
              />
           
                <ImageListItemBar
                    title="Watches"
                    actionIcon={
                        <IconButton 
                            onClick={() => {
                                setCategory("watches");
                            }}
                        >
                            <Link to="/jewelry/watches"> 
                            <ArrowForwardIosIcon />
                            </Link> 
                        </IconButton>
                      }
                />
        
            </ImageListItem>
            <ImageListItem key="2" >
              <img
                src={`${ringCategory}?w=248&fit=crop&auto=format`}
                srcSet={`${ringCategory}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt="click to shop watches"
                loading="lazy"
              />
              <ImageListItemBar
                title="Rings"
                actionIcon={
                    <IconButton 
                        onClick={() => {
                            setCategory("rings");
                        }}
                    >
                        <Link to="/jewelry/rings"> 
                        <ArrowForwardIosIcon />
                        </Link> 
                    </IconButton>
                  }
              />
            </ImageListItem>
            <ImageListItem key="3 " >
              <img
                src={`${earringsCategory}?w=248&fit=crop&auto=format`}
                srcSet={`${earringsCategory}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt="click to shop watches"
                loading="lazy"
              />
              <ImageListItemBar
                title="Earrings"
                actionIcon={
                    <IconButton 
                        onClick={() => {
                            setCategory("earrings");
                        }}
                    >
                        <Link to="/jewelry/earrings"> 
                        <ArrowForwardIosIcon />
                        </Link> 
                    </IconButton>
                  }
              />
            </ImageListItem>
            <ImageListItem key="4">
              <img
                src={`${necklaceCategory}?w=248&fit=crop&auto=format`}
                srcSet={`${necklaceCategory}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt="click to shop watches"
                loading="lazy"
              />
              <ImageListItemBar
                title="Necklaces"
                actionIcon={
                    <IconButton 
                        onClick={() => {
                            setCategory("necklaces");
                        }}
                    >
                        <Link to="/jewelry/necklaces"> 
                        <ArrowForwardIosIcon />
                        </Link> 
                    </IconButton>
                  }
              />
            </ImageListItem>
            <ImageListItem key="5">
              <img
                src={`${braceletCategory}?w=248&fit=crop&auto=format`}
                srcSet={`${braceletCategory}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt="click to shop watches"
                loading="lazy"
              />
              <ImageListItemBar
                title="Bracelets"
                actionIcon={
                    <IconButton 
                        onClick={() => {
                            setCategory("bracelets");
                        }}
                    >
                        <Link to="/jewelry/bracelets"> 
                        <ArrowForwardIosIcon />
                        </Link> 
                    </IconButton>
                  }
              />
            </ImageListItem>
        </ImageList>
    )
};

