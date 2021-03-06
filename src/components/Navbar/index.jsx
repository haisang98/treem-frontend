import React from 'react'
import './Navbar.scss';
// import PropTypes from 'prop-types'
import { AppBar, makeStyles, List, ListItem, ListItemText, Collapse, ClickAwayListener } from '@material-ui/core'
import { Link, NavLink } from 'react-router-dom';
import { navLinks } from '../../helpers/getNavLinks'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useDispatch } from 'react-redux';
import * as ActionType from '../../contants/actionType';

const useStyles = makeStyles(theme => ({
    root : {
        backgroundColor : "#444d58",
        color: "#FFFFFF"
    },
    list : {
        display : "flex",
        marginLeft : "1.5rem"
    },
    textLink : {
        textDecoration: `none`,
        color: `#FFFFFF`
    },
    positionLink : { 
        position: "relative"
    },
    positionSubLink : {
        position: "absolute",
        top: "100%",
        left: 0,
        backgroundColor : "#444d58",
        color: "#FFFFFF",
        zIndex: 100,
        width: "200%",
    }
}))

function Navbar({ locationUser }) {

    const dispatch = useDispatch();
    
    const onHandleAddOtherFamily = () => {

        const {
            id_tinh, thanhpho, id_quan,
            quanhuyen, id_xa, phuongxa,
        } = locationUser
        const data = {
            result : {
                ten_tinhthanhpho:thanhpho,
                id_tinhthanhpho:id_tinh,
                ten_quanhuyen:quanhuyen,
                id_quanhuyen:id_quan,
                ten_phuongxa:phuongxa,
                id_phuongxa:id_xa,
            }
        }

        dispatch({
            type : ActionType.ManageChildren.FETCH_DATA_DETAIL_CHILDREN,
            payload : data,
        })
        dispatch({
            type : ActionType.Status.OPEN_DETAIL_CHILDREN_FOLLOW_LOCATION_USER,
            payload : true
        })

        dispatch({
            type : ActionType.Status.OPEN_DETAIL_CHILDREN,
            payload : true
        })
    }

    const classes = useStyles()

    const [item, setItem] = React.useState(null)
    const [selectedIndex, setSelectedIndex] = React.useState(null);

    const handleListItemClick = (event, index, title) => {
        setSelectedIndex(index);
        (item && item[title]) ? setItem({[title]: !item[title]}) : setItem({[title]: true})
    };
    
    const handleOnClickAway = (event) => {
        setSelectedIndex(null);
        setItem(null);
    };

    return (
        <div className="navbar">
            <ClickAwayListener onClickAway={handleOnClickAway}>
            <AppBar position="static" className={classes.root}>
                <List component="ul" aria-labelledby="main navigation" className={classes.list}>
                    {navLinks.map(({ title, path, dropdown }, idx) => (
                    <div key={idx}>
                        { path ? (
                            <ListItem
                                className={classes.positionLink}
                                button
                                selected={selectedIndex === idx}
                                onClick={(event) => handleListItemClick(event, idx, title)}    
                                >
                                <NavLink to={path} key={title} className={classes.textLink}>
                                    <ListItemText primary={title} />
                                    { dropdown && <ArrowDropDownIcon style={{color:"#FFFFFF"}}/> }
                                </NavLink>
                            </ListItem>
                        ) 
                        : 
                        (
                            <ListItem
                            button
                            selected={selectedIndex === idx}
                            onClick={(event) => handleListItemClick(event, idx, title)}    
                            >
                            <ListItemText primary={title} />
                            { dropdown && <ArrowDropDownIcon style={{color:"#FFFFFF"}}/> }
                            { dropdown && (
                                <Collapse 
                                    timeout="auto" 
                                    unmountOnExit
                                    in={item ? item[title] : null}
                                >
                                    <List
                                        className={classes.positionSubLink}
                                    >
                                        {dropdown.map(({subTitle, subPath, role, notHref}) => {
                                            if(locationUser.id_tinh && !locationUser.id_quan && !locationUser.id_xa){
                                                if(role && role===1){
                                                    return (
                                                        <ListItem
                                                            key={subTitle}
                                                            button
                                                        >
                                                            <NavLink to={`${subPath}`} className={classes.textLink}>
                                                                <ListItemText primary={subTitle} />
                                                            </NavLink>
                                                        </ListItem>
                                                    )
                                                }
                                            }
                                            if(locationUser.id_tinh && locationUser.id_quan && locationUser.id_xa){
                                                if(role && role===2){
                                                    if(notHref){
                                                        return (
                                                            <ListItem
                                                            key={subTitle}
                                                            onClick={onHandleAddOtherFamily}
                                                            button
                                                            >
                                                                <ListItemText primary={subTitle} />
                                                            </ListItem>
                                                        )
                                                    }

                                                    return (
                                                        <ListItem
                                                            key={subTitle}
                                                            button
                                                        >
                                                            <NavLink to={`${subPath}`} className={classes.textLink}>
                                                                <ListItemText primary={subTitle} />
                                                            </NavLink>
                                                        </ListItem>
                                                    )
                                                }
                                            }

                                            if(!role){
                                                return (
                                                    <ListItem
                                                        key={subTitle}
                                                        button
                                                    >
                                                        <NavLink to={`${subPath}`} className={classes.textLink}>
                                                            <ListItemText primary={subTitle} />
                                                        </NavLink>
                                                    </ListItem>
                                                )
                                            }
                                        })}
                                    </List>
                                </Collapse>
                            )}
                            </ListItem>
                        )}
                    </div>
                    ))}
                </List>
            </AppBar>
            </ClickAwayListener>
        </div>
    )
}

Navbar.propTypes = {

}

export default Navbar