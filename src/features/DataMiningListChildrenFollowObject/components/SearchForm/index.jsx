import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
import { Button, Grid } from '@material-ui/core'
import { Field, Formik, Form } from 'formik'
import InputField from '../../../../custom-fields/InputField';
import SelectField from '../../../../custom-fields/SelectField';
import HoanCanhDacBietField from '../../../../custom-fields/HoanCanhDacBietField';
import DateField from '../../../../custom-fields/DateField';
import DescriptionIcon from '@material-ui/icons/Description';
import { agesFrom, comingOfAge } from '../../../../helpers/getListAge';

const FIELD_DISTRICT=2;
const FIELD_WARD=1;

function SearchForm({
     onSubmitForm, locationUser, onChoose,
     quanhuyenList, phuongxaList, thonList,
     listHCDB, listNCHCDB, listHCK, listHTTG,
}) {

    const {
        id_tinh, id_quan, id_xa,
        thanhpho, quanhuyen, phuongxa
    } = locationUser

    const listData = [
        {
            value : 1,
            title: "Trẻ em có hoàn cảnh đặc biệt (HCĐB)",
            children : listHCDB
        },
        {
            value : 2,
            title: "Trẻ em có nguy cơ rơi vào hoàn cảnh đặc biệt (NCĐB)",
            children : listNCHCDB
        },
        {
            value : 3,
            title: "Trẻ em hoàn cảnh khác (HCK)",
            children : listHCK
        },
        {
            value : 4,
            title: "Các hình thức trợ giúp (HTTG)",
            children : listHTTG
        },
    ]

    const onSubmitFormik = (values, action) => {
        onSubmitForm(values)
    }

    const initialStatus = id_xa ? 0 : (!id_xa && id_quan ? 1 : (!id_quan && id_tinh ? 2 : null))

    const [step, setStep] = React.useState(initialStatus);
    const onHandleChoose = (value, field) => {
        if(field==="district"){
            onChoose(value, FIELD_DISTRICT)
            setStep(FIELD_DISTRICT-1);
        }else if(field==="ward"){
            onChoose(value, FIELD_WARD)
            setStep(FIELD_WARD-1);
        }else{
            setStep(0);
        }
    }

    const initialValues = {
        tinhthanhpho: id_tinh || '',
        quanhuyen: id_quan || '',
        phuongxa: id_xa || '',
        thon: '',
        hoancanh: '',
        dotuoitu: '',
        dotuoiden: '',
    }

    return (
        <div className="searchForm">
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmitFormik}
        >
            {formikProps => {

                return (
                    <Form autoComplete="off" className="searchForm__formik">
                        <Grid container item xs={12} spacing={1}>
                            <Grid item xs={6}>
                                <Field 
                                    name="tinhthanhpho"
                                    component={SelectField}

                                    label="Tỉnh Thành Phố"
                                    disabled={thanhpho ? true : false}
                                    valueLocation={thanhpho ? thanhpho : null}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field 
                                name="quanhuyen"
                                component={SelectField}

                                label="Quận Huyện"
                                disabled={quanhuyen ? true : false}
                                valueLocation={quanhuyen ? quanhuyen : null}
                                quanHuyenList={quanhuyenList.length > 0 ? quanhuyenList : null}
                                authDistrictLocation={true}
                                onChoose={onHandleChoose}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field 
                                name="phuongxa"
                                component={SelectField}

                                label="Phường xã"
                                disabled={phuongxa ? true : false}
                                valueLocation={phuongxa ? phuongxa : null}
                                phuongXaList={phuongxaList.length > 0 ? phuongxaList : null}
                                onChoose={onHandleChoose}
                                authWardLocation={true}
                                readOnly={phuongxaList.length > 0 ? false : true}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field 
                                name="thon"
                                component={SelectField}

                                label="Thôn Xóm"
                                disabled={false}
                                thonList={thonList.length > 0 ? thonList : null}
                                readOnly={thonList.length > 0 ? false : true}
                            />
                            </Grid>

                            <Grid item xs={12}>
                                <Field 
                                name="hoancanh"
                                component={HoanCanhDacBietField}

                                listData={listData}
                                label="Chọn chỉ tiêu"
                                placeholder="Chọn chỉ tiêu"
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <Field 
                                name="dotuoitu"
                                component={SelectField}

                                agesFrom={agesFrom}
                                label="Độ tuổi từ"
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <Field 
                                name="dotuoiden"
                                component={SelectField}

                                comingOfAge={comingOfAge}
                                label="Đến độ tuổi"
                                />
                            </Grid>

                            {/* <Grid item xs={12} container> */}
                                <Grid item container xs={12} justify="flex-end" alignItems="center">
                                    <Grid item>
                                        <Button
                                        startIcon={<DescriptionIcon />}
                                        type="submit"
                                        size="small"
                                        variant="contained" 
                                        style={{backgroundColor:"#35baf6",textTransform: "none",fontSize:"13px"}}
                                        >
                                            Xuất dữ liệu
                                        </Button>
                                    </Grid>
                                </Grid>
                            {/* </Grid> */}
                        </Grid>
                        
                    </Form>
                )
            }}
        </Formik>
        </div>
    )
}

SearchForm.propTypes = {

}

export default SearchForm
