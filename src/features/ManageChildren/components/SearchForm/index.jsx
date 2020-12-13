import React from 'react'
import './SearchForm.scss';
import SearchIcon from '@material-ui/icons/Search';
import danToc from '../../../../helpers/getNation';
import {statusExists} from '../../../../helpers/getStatus';
import {Gender} from '../../../../helpers/getGender';
import { Button, Grid } from '@material-ui/core'
import { Field, Formik, Form } from 'formik'
import InputField from '../../../../custom-fields/InputField';
import SelectField from '../../../../custom-fields/SelectField';

const FIELD_DISTRICT=2;
const FIELD_WARD=1;

function SearchForm({
     onSubmitForm, locationUser,
     quanhuyenList, phuongxaList, thonList, onChoose
}) {
    
    const {
        id_tinh, id_quan, id_xa,
        thanhpho, quanhuyen, phuongxa
    } = locationUser

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
        hoten: '',
        nguoinuoi: '',
        id_giadinh: '',
        thungrac: '',
        dantoc: '',
        gioitinh: '',
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
                            <Grid item xs={3}>
                                <Field 
                                    name="tinhthanhpho"
                                    component={SelectField}

                                    label="Tỉnh Thành Phố"
                                    disabled={thanhpho ? true : false}
                                    valueLocation={thanhpho ? thanhpho : null}
                                />
                            </Grid>
                            <Grid item xs={3}>
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
                            <Grid item xs={3}>
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
                            <Grid item xs={3}>
                                <Field 
                                name="thon"
                                component={SelectField}

                                label="Thôn Xóm"
                                disabled={false}
                                thonList={thonList.length > 0 ? thonList : null}
                                readOnly={thonList.length > 0 ? false : true}
                            />
                            </Grid>
                            <Grid item xs={3}>
                                <Field 
                                name="hoten"
                                component={InputField}

                                label="Họ tên trẻ em"
                                placeholder="Nhập họ tên trẻ em..."
                                type="text"
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Field 
                                name="nguoinuoi"
                                component={InputField}

                                label="Họ tên bố hoặc mẹ"
                                placeholder="Nhập họ tên bố hoặc mẹ..."
                                type="text"
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Field 
                                name="id_giadinh"
                                component={InputField}

                                label="Mã gia đình"
                                placeholder="Nhập mã gia đình..."
                                type="text"
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Field 
                                name="thungrac"
                                component={SelectField}

                                label="Trạng Thái"
                                trangThai={statusExists}
                                disabled={false}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Field 
                                name="dantoc"
                                component={SelectField}

                                label="Dân Tộc"
                                disabled={false}
                                danToc={danToc}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Field 
                                name="gioitinh"
                                component={SelectField}

                                label="Giới Tính"
                                disabled={false}
                                gioiTinh={Gender}
                                />
                            </Grid>
                            <Grid item xs={6} container justify="flex-end" alignItems="center">
                                <Button 
                                type="submit" 
                                startIcon={<SearchIcon />}
                                variant="contained" 
                                style={{backgroundColor:"#35baf6"}}
                                >
                                    Tìm kiếm
                                </Button>
                            </Grid>
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
