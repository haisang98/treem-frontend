import React from 'react'
import './ManageRiskSpecial.scss';
import PropTypes from 'prop-types'
import { CssBaseline, Paper } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchWardRequest, fetchVillageRequest } from '../../actions/commonAction';
import { fetchDataRiskSpecialCircumstancesRequest, downloadFileExcelDataNCHCDBRequest } from '../../actions/manageChildrenAction';
import SearchForm from '../ManageRiskSpecial/components/SearchForm';
import Table from '../ManageRiskSpecial/components/Table';
import Snackbars from '../../components/Snackbars';

function ManageRiskSpecial({
    locationUser, quanhuyenList, thonList, phuongxaList,
    fetchWardRequest, fetchVillageRequest, totalRiskSpecial,
    listNCHCDB, riskSpecial, fetchDataRiskSpecialCircumstancesRequest,
    downloadFileExcelDataNCHCDBRequest,
}) {

    const {
        id_tinh, id_quan, id_xa,
        thanhpho, quanhuyen, phuongxa
    } = locationUser

    const [snackbars, setSnackbars] = React.useState(false);
    const onHandleSnackbars = () => {
        setSnackbars(false);
    }

    const [values, setValues] = React.useState({
        thanhpho: id_tinh || '',
        huyen: id_quan || '',
        xa: id_xa || '',
        thon : '',
        hoancanh : '',
        tentreem: '',
        magiadinh: '',
        timestart: '',
        timefinish: '',
        page: null,
    })

    React.useEffect(() => {
        fetchDataRiskSpecialCircumstancesRequest(values)
    }, [values])

    const onChoose = (id, step) => {
        if(step===1){
            fetchVillageRequest(id)
        }else if(step === 2){
            fetchWardRequest(id)
        }
    }

    const onSubmitForm = (value, statusSubmit) => {

        const dataSubmit = {
            thanhpho: value.tinhthanhpho ? value.tinhthanhpho : '',
            huyen: value.quanhuyen ? value.quanhuyen : '',
            xa: value.phuongxa ? value.phuongxa : '',
            thon : value.thon ? value.thon : '',
            hoancanh : value.chitieu ? value.chitieu : '',
            tentreem : value.hoten ? value.hoten : '',
            magiadinh : value.id_giadinh ? value.id_giadinh : '',
            timestart : value.ngaybatdau ? value.ngaybatdau : '',
            timefinish : value.ngayketthuc ? value.ngayketthuc : '',
            page : null,
        }

        if(statusSubmit===1){
            setValues({
                thanhpho: value.tinhthanhpho ? value.tinhthanhpho : '',
                huyen: value.quanhuyen ? value.quanhuyen : '',
                xa: value.phuongxa ? value.phuongxa : '',
                thon : value.thon ? value.thon : '',
                hoancanh : value.chitieu ? value.chitieu : '',
                tentreem : value.hoten ? value.hoten : '',
                magiadinh : value.id_giadinh ? value.id_giadinh : '',
                timestart : value.ngaybatdau ? value.ngaybatdau : '',
                timefinish : value.ngayketthuc ? value.ngayketthuc : '',
                page : null,
            })
        }else if(statusSubmit===2){
            if(!dataSubmit.huyen){
                setSnackbars(true);
            }else{
                downloadFileExcelDataNCHCDBRequest(dataSubmit)
            }
        }else{
            /* TODO SOMETHING */
        }
    }

    const onHandleButtonPagination = (pageNumber) => {

        setValues({
            ...values,
            page : pageNumber+1,
        })

    }

    return (
        <div className="manageRiskSpecial">
            <Paper>
            <CssBaseline />
            <div className="manageRiskSpecial__searchForm">
                <SearchForm
                    onSubmitForm={onSubmitForm}
                    locationUser={locationUser}
                    quanhuyenList={quanhuyenList}
                    phuongxaList={phuongxaList}
                    thonList={thonList}
                    listNCHCDB={listNCHCDB}
                    onChoose={onChoose}
                />
            </div>
            <div className="manageRiskSpecial__dataTable">
                <Paper>
                    <Table 
                        riskSpecial={riskSpecial}
                        listNCHCDB={listNCHCDB}
                        totalRiskSpecial={totalRiskSpecial}
                        onHandlePagination={onHandleButtonPagination}
                    />
                </Paper>
            </div>
            </Paper>
            <Snackbars
                open={snackbars}
                onHandleSnackbars={onHandleSnackbars}
                message="Phải chọn Quận/Huyện để xuất dữ liệu"
                type={1010}
            />
        </div>
    )
}

ManageRiskSpecial.propTypes = {

}

const mapStateToProps = state => ({
    locationUser : state.auth.locationUser,
    phuongxaList : state.common.phuongxaList,
    quanhuyenList : state.common.quanhuyenList,
    thonList : state.common.thonList,
    listNCHCDB : state.common.listNCHCDB,
    riskSpecial : state.manageChildren.riskSpecial,
    totalRiskSpecial : state.manageChildren.totalRiskSpecial,
})

export default connect(mapStateToProps, { fetchWardRequest, fetchVillageRequest, fetchDataRiskSpecialCircumstancesRequest, downloadFileExcelDataNCHCDBRequest })(ManageRiskSpecial)

