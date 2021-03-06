import React from 'react';
import { logo } from '../../contants/images';
import { NavLink } from 'react-router-dom'
import './Header.scss'
import PropTypes from 'prop-types';
import { Avatar, Button, ClickAwayListener, List, ListItem, ListItemIcon, ListItemText, makeStyles, Menu, MenuItem } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { connect } from 'react-redux';
import { logout } from '../../actions/authAction'
import { deepOrange, green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiList-root" : {
          position : "absolute",
          right : '5%',
          top: "100%",
          backgroundColor : "#FFFFFF",
          zIndex: 1,
      },

      "& .MuiListItemText-root" : {
        fontSize : "0.8rem",
      }
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    green: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
    },
  }));

const Link = [
    {
        name: '/quanlytreem',
        show: 'Quản lý trẻ em'
    },
    {
        name: '/hoancanhdacbiet',
        show: 'Hoàn cảnh đặc biệt'
    },
    {
        name: '/nguycohoancanhdacbiet',
        show: 'Nguy cơ hoàn cảnh đặc biệt'
    },
    {
        name: '/hoancanhkhac',
        show: 'Hoàn cảnh khác'
    },
    {
        name: '/hinhthuctrogiup',
        show: 'Hình thức trợ giúp'
    },
    {
        name: '/khaithactreem',
        show: 'Khai thác trẻ em'
    },
    {
        name: '/khaithactreembinhthuong',
        show: 'Khai thác trẻ em bình thường'
    },
    {
        name: '/khaithactreemdoituong',
        show: 'Khai thác trẻ em theo đối tượng'
    },
    {
        name: '/khaithachogiadinh',
        show: 'Khai thác hộ gia đình'
    },
    {
        name: '/quantridiaphuong',
        show: 'Quản lý địa phương'
    },
    {
        name: '/quantringuoidung',
        show: 'Quản lý người dùng'
    },
]

function Header({ logout, username, locationUser, path }) {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const handleOpenClick = () => {
        setOpen(!open)
    }
    
    const handleLogout = () => {
        logout();
    }

    const {
        id_tinh, id_quan, id_xa
    } = locationUser

    return (
        <header className="header">

            <div className="header__left">

                <NavLink
                    className="header__link"
                    activeClassName="header__link--active"
                    to="/"
                    exact
                >
                    <img
                        src={logo} 
                        alt="Logo main of system"
                        className='header__logo'
                    />
                </NavLink>
                <span 
                    className="header__title"
                >
                    {/* Quản lý trẻ em */}
                    { Link.find(({ name, show }) => name===path).show }
                </span>
            </div>

            <div className="header__right" onClick={handleOpenClick}>
                <Avatar className={`header__right--avatar ${id_xa ? `` : (id_quan ? classes.green : classes.orange)}`}>
                    {id_xa ? 'X' : (id_quan ? 'P' : 'TP')}
                </Avatar>
                <span className="header__right--user">{username}</span>
                <ArrowDropDownIcon color="primary"/>

                { open ? (
                    <div className={classes.root}>
                    <List>
                        <NavLink exact to="change-password" style={{ color: "#000" }} >
                            <ListItem
                            button
                            >
                            <ListItemIcon>
                                <VpnKeyIcon fontSize="small"/>
                            </ListItemIcon>
                            <ListItemText primary="Đổi mật khẩu" />
                            </ListItem>
                        </NavLink>


                    <ListItem
                        button
                        onClick={handleLogout}
                    >
                        <ListItemIcon>
                            <PowerSettingsNewIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Đăng xuất" />
                    </ListItem>
                  </List>
                  </div>
                ) : null }
            </div>
        </header>
    )
}

Header.propTypes = {

}

const mapStateToProps = state => ({
    username : state.auth.currentUser,
    locationUser: state.auth.locationUser,
})

export default connect(mapStateToProps, { logout })(Header)

