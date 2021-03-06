import React from 'react'
import PropTypes from 'prop-types'
import { FormControl, InputLabel, makeStyles, MenuItem, Select,  } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    formControl: {
    //   margin: `0 ${theme.spacing(1)}px`, 
      width: '100%',

      '& .MuiInputBase-root' : {
        fontSize: "13px",
        height: "33px",
      },

      '& .MuiFormLabel-root' : {
        fontSize: "13px",
        lineHeight: "0.8",
      },

      '& .MuiOutlinedInput-root': {
        borderRadius : '3px'
      }
    },

    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}));

function SelectField(props) {

    const { 
      form, field, label, disabled, valueLocation, valueDetail,
      phuongXaList, quanHuyenList, thonList, trangThai,
      gioiTinh, danToc, readOnly, onChoose, authWardLocation, authDistrictLocation,
      tinhTrangHocTap, lopHocCaoNhat, listChecked, agesFrom, comingOfAge,
    } = props
    const { name, value } = field
    const { touched, errors } = form

    const classes = useStyles()

  const [state, setState] = React.useState(valueLocation ? valueLocation : (valueDetail ? valueDetail : ''));

  const handleSelect = (event) => {
    const value = event.target.value
    setState(value);
    if(authDistrictLocation){
      onChoose(value, "district");
    }else if(authWardLocation){
      onChoose(value, "ward");
    }else{
      // Do something...
    }

    const changeEvent = {
      target: {
        name: name,
        value: value
      }
    }

    field.onChange(changeEvent)
  };

  // <button type="button" onClick={this.handleClick}>
  //           Reset value
  //         </button>

  //   const handleOnClick = () => {

  //   }

    return (
        <FormControl variant="outlined" margin="dense" className={classes.formControl}>
        { label && <InputLabel id={name} htmlFor={name}>{label}</InputLabel> }

        <Select
          labelId={name}
          id={name}
          {...field}
          onChange={handleSelect}
          // value={state}
          displayEmpty={true}
          name={name}
          label={label}
          error={errors[name] && touched[name] ? true : false}
          disabled={disabled}
          inputProps={{
            readOnly: readOnly,
          }}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left"
            },
            getContentAnchorEl: null
          }}
        >
          {/* <MenuItem value={""}></MenuItem> */}
          {valueLocation && (<MenuItem value={value}>{valueLocation}</MenuItem>)}
          {phuongXaList && (phuongXaList.map(({id_phuongxa, ten_phuongxa}) => (
            <MenuItem value={id_phuongxa} key={id_phuongxa}>{ten_phuongxa}</MenuItem>
          )))}
          {quanHuyenList && (quanHuyenList.map(({id_quanhuyen, ten_quanhuyen}) => (
            <MenuItem value={id_quanhuyen} key={id_quanhuyen}>{ten_quanhuyen}</MenuItem>
          )))}
          {thonList && (thonList.map(({id_thon, tenthon}) => (
            <MenuItem value={id_thon} key={id_thon}>{tenthon}</MenuItem>
          )))}
          {(trangThai && trangThai.length>0) && (trangThai.map(({value, title}) => (
            <MenuItem value={value} key={title}>{title}</MenuItem>
          )))}
          {(gioiTinh && gioiTinh.length>0) && (gioiTinh.map(({value, title}) => (
            <MenuItem value={value} key={title}>{title}</MenuItem>
          )))}
          {danToc && (danToc.map((dantoc) => (
            <MenuItem value={dantoc}>{dantoc}</MenuItem>
          )))}
          {tinhTrangHocTap && (tinhTrangHocTap.map(({value, title}) => (
            <MenuItem value={value}>{title}</MenuItem>
          )))}
          {lopHocCaoNhat && (lopHocCaoNhat.map((e) => (
            <MenuItem value={e}>{e}</MenuItem>
          )))}
          {listChecked && (listChecked.map(({id_thon, tenthon}) => (
            <MenuItem value={id_thon}>{tenthon}</MenuItem>
          )))}
          {agesFrom && (agesFrom.map(e => (
            <MenuItem value={e}>{e}</MenuItem>
          )))}
          {comingOfAge && (comingOfAge.map(e => (
            <MenuItem value={e}>{e}</MenuItem>
          )))}
        </Select>
      </FormControl>
    )
}

SelectField.propTypes = {
    form: PropTypes.object.isRequired,
    field: PropTypes.object.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
    trangThai: PropTypes.array,
    gioiTinh: PropTypes.array,
    danToc: PropTypes.array,
}

SelectField.defaultProps = {
    label: '',
    disabled: null,
    trangThai: null,
    gioiTinh: null,
    danToc: null,
}

export default SelectField

