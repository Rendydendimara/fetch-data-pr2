import { Input } from '@chakra-ui/input';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/modal';
import { Spinner } from '@chakra-ui/spinner';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import React, { useEffect, useState } from 'react';
import Select, { ActionMeta, OnChangeValue, StylesConfig } from 'react-select';
import {
  IAppHeaderForm,
  IDataBuying,
  IDataSeling,
  IFormBuying,
  IFormSelling,
  IDataTabelBuying,
  ISelectJobSheetID,
  IDataValue,
} from './interface';
import { useToast } from '@chakra-ui/react';
import { Button } from '@chakra-ui/button';
import axios from 'axios';
import TdTabelDetail from './components/molecules/TdTabelDetail';
import findIndex from 'lodash/findIndex';

export interface IDataItem {
  label: string;
  data: any;
}
const CONFIG_FETCH = {
  headers: { 'Access-Control-Allow-Origin': '*' },
};

export const convertUSDFormat = (
  num: number,
  type: 'IDR' | 'USD' | 'NominalDollar'
): string => {
  const fixNum = num; // Number(num.toString().replaceAll('.', ''));
  if (fixNum < 1) {
    return String(fixNum);
  } else {
    if (type === 'IDR') {
      return new Intl.NumberFormat('en-ID', {
        style: 'currency',
        currency: 'IDR',
      })
        .format(fixNum)
        .replace(/[IDR]/gi, '')
        .replace(/(\.+\d{2})/, '')
        .trimLeft();
      // parseFloat((a-b).toFixed(2));
    } else if (type === 'USD') {
      return num.toLocaleString('en-US', {
        currency: 'USD',
      });
    } else {
      return num.toString();
    }
  }
};

const colourStyles: StylesConfig<any> = {
  control: (provided) => ({
    ...provided,
    background: '#fff',
    minHeight: '30px',
    height: '30px',
  }),

  valueContainer: (provided) => ({
    ...provided,
    height: '30px',
    padding: '0 6px',
  }),

  input: (provided) => ({
    ...provided,
    margin: '0px',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: '30px',
  }),
};

function App() {
  const toast = useToast();
  const [listSelectJobSheetID, setListSelectJobSheetID] = useState<
    ISelectJobSheetID[]
  >([]);
  const [dataTabelDetailBuying, setDataTabelDetailBuying] = useState<
    IDataTabelBuying[]
  >([]);
  const [dataTabelDetailSelling, setDataTabelDetailSelling] = useState<any[]>(
    []
  );
  const [dataTabelBuyingHumico, setDataTabelBuyingHumico] = useState<any[]>([]);
  const [title, setTitle] = useState<string>('');
  const [lokasiStuffing, setLokasiStuffing] = useState<any>('');
  const [dataAktifBuy, setDataAktifBuy] = useState<any[]>([]);
  const [dataAktifSell, setDataAktifSell] = useState<any[]>([]);
  const [isLoadingFetch, setIsLoadingFetch] = useState<boolean>(false);
  const [isLoadingFetchPost, setIsLoadingFetchPost] = useState<boolean>(false);
  const [listDataBuying, setListDataBuying] = useState<IDataBuying[]>([]);
  const [listDataSelling, setListDataSelling] = useState<IDataSeling[]>([]);
  const [dataAppHeaderForm, setDataAppHeaderForm] = useState<IAppHeaderForm>({
    mjid: '',
    sid: '',
    emkl: '',
    ratePajak: '',
    rateBonus: '',
  });
  const [dataBuyingForm, setDataBuyingForm] = useState<IFormBuying>({
    fixIsiJobsheetID: null,
    nominalDipakai1IDR2USD: '',
    nominal: '',
    kurs: '',
    nominalDollar: '',
  });
  const [dataSellingForm, setDataSellingForm] = useState<IFormSelling>({
    fixIsiJobsheetID: null,
    nominalDipakai1IDR2USD: '',
    nominal: '',
    kurs: '',
    nominalDollar: '',
  });
  const [idEditFormBuying, setIdEditFormBuying] = useState<number | null>(null);
  const [idEditFormSelling, setIdEditFormSelling] =
    useState<number | null>(null);
  const [isEditExitsAktifBuy, setIsEditExitsAktifBuy] =
    useState<boolean>(false);
  const [isEditExitsAktifSell, setIsEditExitsAktifSell] =
    useState<boolean>(false);
  const [listContainer, setListContainer] = useState<any[]>([]);

  const getDataJobsheetID = async () => {
    // const response = await ApiGetDataJobsheetID();

    const response = await axios.get(
      '/api/apcargo/public/admin/getJSbuyingSelling',
      CONFIG_FETCH
    );

    if (response.status === 200) {
      let temp: ISelectJobSheetID[] = [];
      if (response.data.hasOwnProperty('hasil')) {
        response.data.hasil.forEach((jobSheet: any) => {
          temp.push({
            value: jobSheet.id,
            label: jobSheet.nama,
          });
        });
        setListSelectJobSheetID(temp);
      }
    }
  };

  const handleChangeJobSheetIDBuying = (
    newValue: OnChangeValue<ISelectJobSheetID, false>,
    actionMeta: ActionMeta<any>
  ) => {
    setDataBuyingForm({
      ...dataBuyingForm,
      fixIsiJobsheetID: newValue,
    });
  };

  const handleChangeJobSheetIDSelling = (
    newValue: OnChangeValue<ISelectJobSheetID, false>,
    actionMeta: ActionMeta<any>
  ) => {
    setDataSellingForm({
      ...dataSellingForm,
      fixIsiJobsheetID: newValue,
    });
  };

  const handleChangeDataAppHeaderForm = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.target.name === 'emkl') {
      setDataAppHeaderForm({
        ...dataAppHeaderForm,
        [event.target.name]: event.target.value,
      });
    } else {
      const re = /^([0-9]|[^,$\w])*$/;
      let num = event.target.value; // .replaceAll(',', '');
      if (event.target.value === '' || re.test(num)) {
        setDataAppHeaderForm({
          ...dataAppHeaderForm,
          [event.target.name]: num,
        });
      }
    }
  };

  const handleChangeDataFormBuying = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const re = /^([0-9]|[^,$\w])*$/;
    let num = event.target.value; // .replaceAll(',', '');
    if (event.target.value === '' || re.test(num)) {
      let temp = {
        ...dataBuyingForm,
        [event.target.name]: num,
      };
      if (temp.kurs === '999' || temp.nominal === '999') {
        setDataBuyingForm({
          ...temp,
          nominalDollar: '',
        });
      } else {
        if (event.target.name === 'nominal' || event.target.name === 'kurs') {
          // nominal + kurs = dollar
          const nominal = Number(temp.nominal) / Number(temp.kurs);
          temp = {
            ...temp,
            nominalDollar: String(
              nominal == Infinity ? 0 : isNaN(nominal) ? 0 : nominal
            ),
          };
          setDataBuyingForm(temp);
        } else if (
          event.target.name === 'nominalDollar' ||
          event.target.name === 'kurs'
        ) {
          // dollar + kurs = nominal
          const nominal = Number(temp.nominalDollar) * Number(temp.kurs);
          temp = {
            ...temp,
            nominal: String(
              nominal == Infinity ? 0 : isNaN(nominal) ? 0 : nominal
            ),
          };
          setDataBuyingForm(temp);
        } else {
          setDataBuyingForm({
            ...temp,
          });
        }
      }
    }
  };

  const handleChangeDataFormSelling = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const re = /^([0-9]|[^,$\w])*$/;
    let num = event.target.value; // .replaceAll(',', '');
    if (event.target.value === '' || re.test(num)) {
      let temp = {
        ...dataSellingForm,
        [event.target.name]: num,
      };
      if (temp.kurs === '999' || temp.nominal === '999') {
        setDataSellingForm({
          ...temp,
          nominalDollar: '',
        });
      } else {
        if (event.target.name === 'nominal' || event.target.name === 'kurs') {
          // nominal + kurs = dollar
          const nominal = Number(temp.nominal) / Number(temp.kurs);
          temp = {
            ...temp,
            nominalDollar: String(
              nominal == Infinity ? 0 : isNaN(nominal) ? 0 : nominal
            ),
          };
          setDataSellingForm(temp);
        } else if (
          event.target.name === 'nominalDollar' ||
          event.target.name === 'kurs'
        ) {
          // dollar + kurs = nominal
          const nominal = Number(temp.nominalDollar) * Number(temp.kurs);
          temp = {
            ...temp,
            nominal: String(
              nominal == Infinity ? 0 : isNaN(nominal) ? 0 : nominal
            ),
          };
          setDataSellingForm(temp);
        } else {
          setDataSellingForm({
            ...temp,
          });
        }
      }
    }
  };

  const handleAddUpdateListDataBuying = () => {
    if (idEditFormBuying) {
      if (isEditExitsAktifBuy) {
        // update data aktif buy from API
        const indexData = findIndex(dataAktifBuy, [
          'id',
          String(idEditFormBuying),
        ]);
        setDataAktifBuy([
          ...dataAktifBuy.slice(0, indexData),
          {
            ...dataAktifBuy[indexData],
            id: String(idEditFormBuying),
            fix_isijobsheet_id: dataBuyingForm.fixIsiJobsheetID?.value ?? '',
            nominaldipakai: dataBuyingForm.nominalDipakai1IDR2USD,
            nominal: dataBuyingForm.nominal,
            kurs: dataBuyingForm.kurs,
            nominaldolar: dataBuyingForm.nominalDollar,
          },
          ...dataAktifBuy.slice(indexData + 1, dataAktifBuy.length),
        ]);
        setIsEditExitsAktifBuy(false);
      } else {
        const indexData = findIndex(listDataBuying, ['id', idEditFormBuying]);
        setListDataBuying([
          ...listDataBuying.slice(0, indexData),
          {
            id: idEditFormBuying,
            fixIsiJobsheetID: dataBuyingForm.fixIsiJobsheetID,
            nominalDipakai1IDR2USD: dataBuyingForm.nominalDipakai1IDR2USD,
            nominal: dataBuyingForm.nominal,
            kurs: dataBuyingForm.kurs,
            nominalDollar: dataBuyingForm.nominalDollar,
          },
          ...listDataBuying.slice(indexData + 1, listDataBuying.length),
        ]);
      }
      setIdEditFormBuying(null);
      toast({
        title: 'Success',
        description: 'success update data buying.',
        status: 'success',
        position: 'bottom-right',
        duration: 5000,
        isClosable: true,
      });
    } else {
      const temp = [
        ...listDataBuying,
        {
          id: new Date().getTime(),
          fixIsiJobsheetID: dataBuyingForm.fixIsiJobsheetID,
          nominalDipakai1IDR2USD: dataBuyingForm.nominalDipakai1IDR2USD,
          nominal: dataBuyingForm.nominal,
          kurs: dataBuyingForm.kurs,
          nominalDollar: dataBuyingForm.nominalDollar,
        },
      ].sort((a, b) => {
        if (a.id > b.id) return -1;
        if (a.id < b.id) return 1;
        return 0;
      });
      setListDataBuying(temp);
      toast({
        title: 'Success',
        description: 'success add data buying.',
        status: 'success',
        position: 'bottom-right',
        duration: 5000,
        isClosable: true,
      });
    }
    handleClearFormData('buying');
  };
  const handleAddUpdateListDataSelling = () => {
    if (idEditFormSelling) {
      if (isEditExitsAktifSell) {
        const indexData = findIndex(dataAktifSell, [
          'id',
          String(idEditFormSelling),
        ]);
        setDataAktifSell([
          ...dataAktifSell.slice(0, indexData),
          {
            ...dataAktifSell[indexData],
            id: String(idEditFormSelling),
            fix_isijobsheet_id: dataSellingForm.fixIsiJobsheetID?.value ?? '',
            nominaldipakai: dataSellingForm.nominalDipakai1IDR2USD,
            nominal: dataSellingForm.nominal,
            kurs: dataSellingForm.kurs,
            nominaldolar: dataSellingForm.nominalDollar,
          },
          ...dataAktifSell.slice(indexData + 1, dataAktifSell.length),
        ]);
        setIsEditExitsAktifBuy(false);
      } else {
        const indexData = findIndex(listDataSelling, ['id', idEditFormSelling]);
        setListDataSelling([
          ...listDataSelling.slice(0, indexData),
          {
            id: idEditFormSelling,
            fixIsiJobsheetID: dataSellingForm.fixIsiJobsheetID,
            nominalDipakai1IDR2USD: dataSellingForm.nominalDipakai1IDR2USD,
            nominal: dataSellingForm.nominal,
            kurs: dataSellingForm.kurs,
            nominalDollar: dataSellingForm.nominalDollar,
          },
          ...listDataSelling.slice(indexData + 1, listDataSelling.length),
        ]);
      }
      setIdEditFormSelling(null);
      toast({
        title: 'Success',
        description: 'success update data selling.',
        status: 'success',
        position: 'bottom-right',
        duration: 5000,
        isClosable: true,
      });
    } else {
      const temp = [
        ...listDataSelling,
        {
          id: new Date().getTime(),
          fixIsiJobsheetID: dataSellingForm.fixIsiJobsheetID,
          nominalDipakai1IDR2USD: dataSellingForm.nominalDipakai1IDR2USD,
          nominal: dataSellingForm.nominal,
          kurs: dataSellingForm.kurs,
          nominalDollar: dataSellingForm.nominalDollar,
        },
      ].sort((a, b) => {
        if (a.id > b.id) return -1;
        if (a.id < b.id) return 1;
        return 0;
      });
      setListDataSelling(temp);
      toast({
        title: 'Success',
        description: 'success add data selling.',
        status: 'success',
        duration: 5000,
        position: 'bottom-right',
        isClosable: true,
      });
    }
    handleClearFormData('selling');
  };

  const handleClearFormData = (formName: 'buying' | 'selling') => {
    if (formName === 'buying') {
      setDataBuyingForm({
        fixIsiJobsheetID: null,
        nominalDipakai1IDR2USD: '',
        nominal: '',
        kurs: '',
        nominalDollar: '',
      });
    } else {
      setDataSellingForm({
        fixIsiJobsheetID: null,
        nominalDipakai1IDR2USD: '',
        nominal: '',
        kurs: '',
        nominalDollar: '',
      });
    }
    if (isEditExitsAktifBuy) {
      setIsEditExitsAktifBuy(false);
    }
    if (isEditExitsAktifSell) {
      setIsEditExitsAktifSell(false);
    }
    if (idEditFormBuying !== null) {
      setIdEditFormBuying(null);
    }
    if (idEditFormSelling !== null) {
      setIdEditFormSelling(null);
    }
  };

  const handleEditDataBuying = (id: number) => {
    if (isEditExitsAktifBuy) {
      setIsEditExitsAktifBuy(false);
    }
    let selectedData = listDataBuying.filter(
      (data: IDataBuying) => data.id === id
    );
    if (selectedData.length > 0) {
      setIdEditFormBuying(id);
      setDataBuyingForm({
        fixIsiJobsheetID: selectedData[0].fixIsiJobsheetID,
        nominalDipakai1IDR2USD: selectedData[0].nominalDipakai1IDR2USD,
        nominal: selectedData[0].nominal,
        kurs: selectedData[0].kurs,
        nominalDollar: selectedData[0].nominalDollar,
      });
    }
  };

  const handleEditDataAktifBuy = (id: number) => {
    let selectedData = dataAktifBuy.filter(
      (data: any) => Number(data.id) === id
    );

    if (selectedData.length > 0) {
      let fixIsiJobsheetID = listSelectJobSheetID.filter(
        (job: ISelectJobSheetID) =>
          job.value === selectedData[0].fix_isijobsheet_id
      );
      setIdEditFormBuying(id);
      setIsEditExitsAktifBuy(true);
      setDataBuyingForm({
        fixIsiJobsheetID:
          fixIsiJobsheetID[0] ?? selectedData[0].fix_isijobsheet_id,
        nominalDipakai1IDR2USD: selectedData[0].nominaldipakai,
        nominal: selectedData[0].nominal,
        kurs: selectedData[0].kurs,
        nominalDollar: selectedData[0].nominaldolar,
      });
    }
  };

  const handleDeleteDataBuying = (id: number) => {
    const newDataBuying = listDataBuying.filter(
      (data: IDataBuying) => data.id !== id
    );
    setListDataBuying(newDataBuying);
  };

  const handleDeleteDataAktifBuy = (id: number) => {
    const newData = dataAktifBuy.filter((data: any) => Number(data.id) !== id);
    setDataAktifBuy(newData);
  };

  const handleEditDataSelling = (id: number) => {
    if (isEditExitsAktifSell) {
      setIsEditExitsAktifSell(false);
    }
    let selectedData = listDataSelling.filter(
      (data: IDataSeling) => data.id === id
    );
    if (selectedData.length > 0) {
      setIdEditFormSelling(id);
      setDataSellingForm({
        fixIsiJobsheetID: selectedData[0].fixIsiJobsheetID,
        nominalDipakai1IDR2USD: selectedData[0].nominalDipakai1IDR2USD,
        nominal: selectedData[0].nominal,
        kurs: selectedData[0].kurs,
        nominalDollar: selectedData[0].nominalDollar,
      });
    }
  };

  const handleEditDataAktifSell = (id: number) => {
    let selectedData = dataAktifSell.filter(
      (data: any) => Number(data.id) === id
    );

    if (selectedData.length > 0) {
      let fixIsiJobsheetID = listSelectJobSheetID.filter(
        (job: ISelectJobSheetID) =>
          job.value === selectedData[0].fix_isijobsheet_id
      );
      setIdEditFormSelling(id);
      setIsEditExitsAktifSell(true);
      setDataSellingForm({
        fixIsiJobsheetID:
          fixIsiJobsheetID[0] ?? selectedData[0].fix_isijobsheet_id,
        nominalDipakai1IDR2USD: selectedData[0].nominaldipakai,
        nominal: selectedData[0].nominal,
        kurs: selectedData[0].kurs,
        nominalDollar: selectedData[0].nominaldolar,
      });
    }
  };

  const handleDeleteDataAktifSell = (id: number) => {
    const newData = dataAktifSell.filter((data: any) => Number(data.id) !== id);
    setDataAktifSell(newData);
  };

  const handleDeleteDataSelling = (id: number) => {
    const newDataSelling = listDataSelling.filter(
      (data: IDataSeling) => data.id !== id
    );
    setListDataSelling(newDataSelling);
  };

  const getDataPanel = async (id: string) => {
    const response = await axios.get(
      `/api/apcargo/public/admin/getJSData/${id}`,
      CONFIG_FETCH
    );

    if (response.status === 200) {
      let dataPasif: any[] = [];
      const dataAktifSell: any[] = [];
      const pasif = response.data.hasil.pasif;
      const aktif = response.data.hasil.aktif;
      let tempData: any[] = [];
      let tempBuy: any = [];
      let tempSell: any = [];
      aktif.buy.forEach((data: any) => {
        let fixIsiJobsheetID = listSelectJobSheetID.filter(
          (job: ISelectJobSheetID) => job.value === data.fix_isijobsheet_id
        );
        if (fixIsiJobsheetID.length > 0) {
          tempBuy.push({
            ...data,
            fix_isijobsheet_id: fixIsiJobsheetID[0],
          });
        } else {
          tempBuy.push(data);
        }
      });
      setTitle(aktif.tableatas.kodeshipment);
      setLokasiStuffing(aktif.tableatas.lokasistuffing);
      setListContainer(response.data.hasil.container);
      aktif.sell.forEach((data: any) => {
        let fixIsiJobsheetID = listSelectJobSheetID.filter(
          (job: ISelectJobSheetID) => job.value === data.fix_isijobsheet_id
        );
        if (fixIsiJobsheetID.length > 0) {
          tempSell.push({
            ...data,
            fix_isijobsheet_id: fixIsiJobsheetID[0],
          });
        } else {
          tempSell.push(data);
        }
      });
      setDataAktifBuy(tempBuy);
      setDataAktifSell(tempSell);

      for (let key in pasif) {
        let tempData: any[] = [];
        pasif[key].map((da: any) => {
          let temp: IDataValue[] = [];
          for (let keyDt in da) {
            temp.push({
              label: keyDt,
              value: da[keyDt],
            });
          }
          tempData.push(temp);
        });
        dataPasif.push({
          label: key,
          data: tempData,
        });
      }
      const humico = dataPasif.filter((dt: any) => dt.label === 'humico');
      dataPasif = dataPasif.filter((dt: any) => dt.label !== 'humico');
      setDataTabelBuyingHumico(humico);
      setDataTabelDetailBuying(dataPasif);
      setDataTabelDetailSelling(dataAktifSell);
      setDataAppHeaderForm({
        sid: aktif.tableatas.sid ?? '',
        mjid: aktif.tableatas.mjid ?? '',
        emkl: aktif.tableatas.emkl ?? '',
        ratePajak: aktif.tableatas.rate_pajak ?? '',
        rateBonus: aktif.tableatas.rate_bonus ?? '',
      });
    }
  };

  const getBiayaLapangName = (id: string): string => {
    let fixIsiJobsheetID = listSelectJobSheetID.filter(
      (job: ISelectJobSheetID) => job.value === id
    );
    if (fixIsiJobsheetID.length > 0) {
      return fixIsiJobsheetID[0].label;
    }
    return 'null';
  };

  const handlePostData = (e: any) => {
    e.preventDefault();
    setIsLoadingFetchPost(true);
    let dataBuying: any[] = [];
    let dataSelling: any[] = [];
    listDataBuying.forEach((data: IDataBuying) => {
      dataBuying.push({
        nominaldipakai: data.nominalDipakai1IDR2USD,
        nominal: data.nominal,
        kurs: data.kurs,
        nominaldolar: data.nominalDollar,
        biayalapangan: data.fixIsiJobsheetID?.value ?? null,
      });
    });
    listDataSelling.forEach((data: IDataSeling) => {
      dataSelling.push({
        nominaldipakai: data.nominalDipakai1IDR2USD,
        nominal: data.nominal,
        kurs: data.kurs,
        nominaldolar: data.nominalDollar,
        biayalapangan: data.fixIsiJobsheetID?.value ?? null,
      });
    });
    dataAktifBuy.forEach((data: any) => {
      dataBuying.push({
        nominaldipakai: data.nominaldipakai,
        nominal: data.nominal,
        kurs: data.kurs,
        nominaldolar: data.nominaldolar,
        biayalapangan:
          data.fix_isijobsheet_id?.value ?? data.fix_isijobsheet_id,
        jid: data.jid,
      });
    });
    dataAktifSell.forEach((data: any) => {
      dataSelling.push({
        nominaldipakai: data.nominaldipakai,
        nominal: data.nominal,
        kurs: data.kurs,
        nominaldolar: data.nominaldolar,
        biayalapangan:
          data.fix_isijobsheet_id?.value ?? data.fix_isijobsheet_id,
        jid: data.jid,
      });
    });

    const data = {
      jobsheet: {
        mjid: dataAppHeaderForm.mjid ?? 0,
        sid: dataAppHeaderForm.sid ?? 0,
        js: {
          rate_pajak: dataAppHeaderForm.ratePajak ?? 0,
          bonus: dataAppHeaderForm.rateBonus ?? 0,
          emkl: dataAppHeaderForm.emkl ?? 0,
        },
        buying: dataBuying,
        selling: dataSelling,
      },
    };
    console.log('data', data);
    axios
      .post('/api/apcargo/public/postDataJS', data, CONFIG_FETCH)
      .then((res: any) => {
        setIsLoadingFetchPost(false);
        toast({
          title: 'Success',
          description: 'Success post data.',
          status: 'success',
          position: 'bottom-right',
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err: any) => {
        setIsLoadingFetchPost(false);
        toast({
          title: 'Failed',
          description: 'Pailed post data.',
          status: 'error',
          position: 'bottom-right',
          duration: 5000,
          isClosable: true,
        });
        console.log('err', err);
      });
  };

  useEffect(() => {
    getDataJobsheetID();
    if (document.location) {
      // let loc:any = document.location;
      let params: any = new URL(document.location).searchParams;
      let paramsId: any = params.get('id');
      // const paramArr = window.location.href.split('/');
      // const paramsId = paramArr[paramArr.length - 1];
      if (paramsId) {
        getDataPanel(paramsId);
      }
    }
  }, []);

  return (
    <Box p='20px'>
      <Box w='full' mt='20px'>
        {/* Header App */}
        <Box w='full' mb='25px'>
          <Box w='full'>
            <Text fontSize='24px' fontWeight='bold' color='#000000'>
              {title}
            </Text>
            {title && (
              <Text mr='15px' fontSize='20px' fontWeight='bold' color='#000000'>
                Lokasi Stuffing: {lokasiStuffing ? `${lokasiStuffing}` : 'null'}
              </Text>
            )}
            {listContainer.map((container: any, index: number) => (
              <Flex alignItems='center'>
                <Text
                  mr='15px'
                  fontSize='20px'
                  fontWeight='bold'
                  color='#000000'
                >
                  No Container: {container?.kodecontainer ?? 'null'}
                </Text>
                <Text
                  mr='15px'
                  fontSize='20px'
                  fontWeight='bold'
                  color='#000000'
                >
                  No Seal: {container?.noseal ?? 'null'}
                </Text>
                <Text
                  mr='15px'
                  fontSize='20px'
                  fontWeight='bold'
                  color='#000000'
                >
                  Capacity: {container?.nama ?? 'null'}
                </Text>
                <Text
                  mr='15px'
                  fontSize='20px'
                  fontWeight='bold'
                  color='#000000'
                >
                  Notes: {container?.notes ?? 'null'}
                </Text>
              </Flex>
            ))}
            {dataAppHeaderForm.mjid && (
              <a
                href={`/api/apcargo/public/admin/fix_mainjobsheet/lihatjobsheet/${dataAppHeaderForm.mjid}`}
                rel='noreferrer'
                target='_blank'
              >
                <Button
                  width='150px'
                  height='35px'
                  bgColor='blue.300'
                  color='white'
                  mb='25px'
                  mt='20px'
                >
                  Lihat hasil
                </Button>
              </a>
            )}
            <Box
              w={{
                base: '100%',
                sm: '100%',
                md: '50%',
                xl: '50%',
              }}
            >
              <Table size='sm'>
                <Tbody>
                  <Tr>
                    <Td borderStyle='none' px='0px' py='4px'>
                      EMKL
                    </Td>
                    <Td borderStyle='none' px='0px' py='4px'>
                      <Input
                        name='emkl'
                        value={dataAppHeaderForm.emkl}
                        onChange={handleChangeDataAppHeaderForm}
                        height='30px'
                      />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td borderStyle='none' px='0px' py='4px'>
                      Rate Pajak
                    </Td>
                    <Td borderStyle='none' px='0px' py='4px'>
                      <Input
                        name='ratePajak'
                        // value={convertUSDFormat(
                        //   Number(dataAppHeaderForm.ratePajak),
                        //   'IDR'
                        // )}
                        value={dataAppHeaderForm.ratePajak}
                        onChange={handleChangeDataAppHeaderForm}
                        height='30px'
                        type='string'
                      />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td borderStyle='none' px='0px' py='4px'>
                      Rate Bonus
                    </Td>
                    <Td borderStyle='none' px='0px' py='4px'>
                      <Input
                        name='rateBonus'
                        // value={convertUSDFormat(
                        //   Number(dataAppHeaderForm.rateBonus),
                        //   'IDR'
                        // )}
                        value={dataAppHeaderForm.rateBonus}
                        onChange={handleChangeDataAppHeaderForm}
                        height='30px'
                        type='string'
                      />
                    </Td>
                  </Tr>
                  {/* <Tr>
                  <Td borderStyle='none' px='0px' py='4px'>
                    MJID
                  </Td>
                  <Td borderStyle='none' px='0px' py='4px'>
                    <Input
                      name='mjid'
                      value={dataAppHeaderForm.mjid}
                      onChange={handleChangeDataAppHeaderForm}
                      height='30px'
                      type='number'
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Td borderStyle='none' px='0px' py='4px'>
                    SID
                  </Td>
                  <Td borderStyle='none' px='0px' py='4px'>
                    <Input
                      name='sid'
                      value={dataAppHeaderForm.sid}
                      onChange={handleChangeDataAppHeaderForm}
                      height='30px'
                      type='number'
                    />
                  </Td>
                </Tr> */}
                </Tbody>
              </Table>
            </Box>
          </Box>
        </Box>
        {/* Form App */}
        <Box w='full'>
          <Flex
            gridGap='3'
            flexDirection={{
              base: 'column',
              sm: 'column',
              md: 'row',
              xl: 'row',
            }}
          >
            {/* Form Buying */}
            <Box
              w={{
                base: '100%',
                sm: '100%',
                md: '50%',
                xl: '50%',
              }}
            >
              <Text bgColor='gray.400' fontWeight='bold' fontSize='14px'>
                Buying
              </Text>
              <Table size='sm'>
                <Tbody>
                  <Tr>
                    <Td borderStyle='none' px='0px' py='4px'>
                      Fix Isi Jobsheet ID
                    </Td>
                    <Td borderStyle='none' px='0px' py='4px' height='30px'>
                      <Select
                        options={listSelectJobSheetID}
                        onChange={handleChangeJobSheetIDBuying}
                        placeholder='Select jobsheet id'
                        styles={colourStyles}
                        value={dataBuyingForm.fixIsiJobsheetID}
                      />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td borderStyle='none' px='0px' py='4px'>
                      Nominal Dipakai 1 IDR 2 USD
                    </Td>
                    <Td borderStyle='none' px='0px' py='4px'>
                      <Input
                        name='nominalDipakai1IDR2USD'
                        onChange={handleChangeDataFormBuying}
                        height='30px'
                        // value={convertUSDFormat(
                        //   Number(dataBuyingForm.nominalDipakai1IDR2USD),
                        //   'IDR'
                        // )}
                        value={dataBuyingForm.nominalDipakai1IDR2USD}
                        type='string'
                      />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td borderStyle='none' px='0px' py='4px'>
                      Nominal
                    </Td>
                    <Td borderStyle='none' px='0px' py='4px'>
                      <Input
                        name='nominal'
                        onChange={handleChangeDataFormBuying}
                        height='30px'
                        // value={convertUSDFormat(
                        //   Number(dataBuyingForm.nominal),
                        //   'IDR'
                        // )}
                        value={dataBuyingForm.nominal}
                        type='string'
                      />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td borderStyle='none' px='0px' py='4px'>
                      Kurs
                    </Td>
                    <Td borderStyle='none' px='0px' py='4px'>
                      <Input
                        name='kurs'
                        onChange={handleChangeDataFormBuying}
                        height='30px'
                        // value={convertUSDFormat(
                        //   Number(dataBuyingForm.kurs),
                        //   'IDR'
                        // )}
                        value={dataBuyingForm.kurs}
                        type='string'
                      />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td borderStyle='none' px='0px' py='4px'>
                      Nominal Dollar
                    </Td>
                    <Td borderStyle='none' px='0px' py='4px'>
                      <Input
                        name='nominalDollar'
                        onChange={handleChangeDataFormBuying}
                        height='30px'
                        // value={convertUSDFormat(
                        //   Number(dataBuyingForm.nominalDollar),
                        //   'NominalDollar'
                        // )}
                        value={dataBuyingForm.nominalDollar}
                        // value={dataBuyingForm.nominalDollar}
                        type='text'
                      />
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
              <Flex justifyContent='center' w='full' mt='10px' gridGap='15px'>
                <Button
                  width='150px'
                  height='35px'
                  bgColor='green.300'
                  color='white'
                  onClick={handleAddUpdateListDataBuying}
                >
                  {idEditFormBuying ? 'Update' : 'Add'}
                </Button>
                <Button
                  width='150px'
                  height='35px'
                  bgColor='yellow.300'
                  color='white'
                  onClick={() => handleClearFormData('buying')}
                >
                  Cancel
                </Button>
              </Flex>
            </Box>
            {/* Form Seling */}
            <Box
              w={{
                base: '100%',
                sm: '100%',
                md: '50%',
                xl: '50%',
              }}
            >
              <Text bgColor='gray.400' fontWeight='bold' fontSize='14px'>
                Selling
              </Text>
              <Table size='sm'>
                <Tbody>
                  <Tr>
                    <Td borderStyle='none' px='0px' py='4px'>
                      Fix Isi Jobsheet ID
                    </Td>
                    <Td borderStyle='none' px='0px' py='4px' height='30px'>
                      <Select
                        options={listSelectJobSheetID}
                        onChange={handleChangeJobSheetIDSelling}
                        placeholder='Select jobsheet id'
                        styles={colourStyles}
                        value={dataSellingForm.fixIsiJobsheetID}
                      />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td borderStyle='none' px='0px' py='4px'>
                      Nominal Dipakai 1 IDR 2 USD
                    </Td>
                    <Td borderStyle='none' px='0px' py='4px'>
                      <Input
                        name='nominalDipakai1IDR2USD'
                        onChange={handleChangeDataFormSelling}
                        height='30px'
                        // value={convertUSDFormat(
                        //   Number(dataSellingForm.nominalDipakai1IDR2USD),
                        //   'IDR'
                        // )}
                        value={dataSellingForm.nominalDipakai1IDR2USD}
                        type='string'
                      />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td borderStyle='none' px='0px' py='4px'>
                      Nominal
                    </Td>
                    <Td borderStyle='none' px='0px' py='4px'>
                      <Input
                        name='nominal'
                        onChange={handleChangeDataFormSelling}
                        height='30px'
                        // value={convertUSDFormat(
                        //   Number(dataSellingForm.nominal),
                        //   'IDR'
                        // )}
                        value={dataSellingForm.nominal}
                      />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td borderStyle='none' px='0px' py='4px'>
                      Kurs
                    </Td>
                    <Td borderStyle='none' px='0px' py='4px'>
                      <Input
                        name='kurs'
                        onChange={handleChangeDataFormSelling}
                        height='30px'
                        // value={convertUSDFormat(
                        //   Number(dataSellingForm.kurs),
                        //   'IDR'
                        // )}
                        value={dataSellingForm.kurs}
                        type='string'
                      />
                    </Td>
                  </Tr>
                  <Tr>
                    <Td borderStyle='none' px='0px' py='4px'>
                      Nominal Dollar
                    </Td>
                    <Td borderStyle='none' px='0px' py='4px'>
                      <Input
                        name='nominalDollar'
                        // value={convertUSDFormat(
                        //   Number(dataSellingForm.nominalDollar),
                        //   'NominalDollar'
                        // )}
                        value={dataSellingForm.nominalDollar}
                        onChange={handleChangeDataFormSelling}
                        type='text'
                        height='30px'
                      />
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
              <Flex justifyContent='center' w='full' mt='10px' gridGap='15px'>
                <Button
                  width='150px'
                  height='35px'
                  bgColor='green.300'
                  color='white'
                  onClick={handleAddUpdateListDataSelling}
                >
                  {idEditFormSelling ? 'Update' : 'Add'}
                </Button>
                <Button
                  width='150px'
                  height='35px'
                  bgColor='yellow.300'
                  color='white'
                  onClick={() => handleClearFormData('selling')}
                >
                  Cancel
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Box>
        {/* Tabel Detail */}
        <Box w='full' mt='10px'>
          <Flex
            gridGap='3'
            flexDirection={{
              base: 'column',
              sm: 'column',
              md: 'row',
              xl: 'row',
            }}
          >
            {/* Tabel detail buying */}
            <Box
              w={{
                base: '100%',
                sm: '100%',
                md: '50%',
                xl: '50%',
              }}
              borderWidth='2px'
              borderColor='gray.400'
              height='auto'
            >
              <Text>Tabel Detail</Text>
              <Box w='full' h='500px' maxH='500px' overflowY='scroll'>
                <Table size='sm'>
                  <Thead px='4px' bgColor='gray.200'>
                    <Tr>
                      <Th
                        borderStyle='none'
                        px='0px'
                        py='4px'
                        fontSize='11px'
                        textTransform='capitalize'
                        textAlign='center'
                      >
                        Fix Isi Jobsheet ID
                      </Th>
                      <Th
                        borderStyle='none'
                        px='0px'
                        py='4px'
                        fontSize='11px'
                        textTransform='capitalize'
                        textAlign='center'
                        w='100px'
                      >
                        Nominal Dipakai 1 IDR 2 USD
                      </Th>
                      <Th
                        borderStyle='none'
                        px='0px'
                        py='4px'
                        fontSize='11px'
                        textTransform='capitalize'
                        textAlign='center'
                      >
                        Nominal
                      </Th>
                      <Th
                        borderStyle='none'
                        px='0px'
                        py='4px'
                        fontSize='11px'
                        textTransform='capitalize'
                        textAlign='center'
                      >
                        Kurs
                      </Th>
                      <Th
                        borderStyle='none'
                        px='0px'
                        py='4px'
                        fontSize='11px'
                        textTransform='capitalize'
                        textAlign='center'
                        w='80px'
                      >
                        Nominal Dollar
                      </Th>
                      <Th
                        borderStyle='none'
                        px='0px'
                        py='4px'
                        fontSize='11px'
                        textTransform='capitalize'
                        textAlign='center'
                      >
                        Action
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {/* name data tabel akan diambil dari data select Fix Isi Jobsheet ID */}
                    {listDataBuying.map(
                      (dataBuying: IDataBuying, index: number) => (
                        <TdTabelDetail
                          haveAction={true}
                          name={dataBuying.fixIsiJobsheetID?.label ?? ''}
                          total={String(dataBuying.nominalDipakai1IDR2USD)}
                          nominal={String(dataBuying.nominal)}
                          kurs={String(dataBuying.kurs)}
                          nominalDolar={String(dataBuying.nominalDollar)}
                          key={index}
                          onEdit={handleEditDataBuying}
                          onDelete={handleDeleteDataBuying}
                          id={dataBuying.id}
                        />
                      )
                    )}
                    {dataAktifBuy.map((data: any, index: number) => (
                      <TdTabelDetail
                        haveAction={true}
                        name={
                          data.fix_isijobsheet_id?.label ??
                          getBiayaLapangName(data.fix_isijobsheet_id)
                        }
                        total={data.nominaldipakai}
                        nominal={data.nominal}
                        kurs={data.kurs}
                        nominalDolar={data.nominaldolar}
                        key={index}
                        onEdit={handleEditDataAktifBuy}
                        onDelete={handleDeleteDataAktifBuy}
                        id={data.id}
                      />
                    ))}
                    {dataTabelDetailBuying.map(
                      (data: IDataTabelBuying, index: number) => (
                        <>
                          <Text
                            mt='10px'
                            fontSize='13px'
                            borderStyle='none'
                            px='0px'
                            fontWeight='bold'
                            ml='4px'
                            textTransform='capitalize'
                            key={index}
                          >
                            {data.label}
                          </Text>
                          {/* {data.data.map((dt: any) => {
                            return dt.map((d: IDataValue, index3: number) => (
                              <TdTabelDetail
                                name={String(d.label)}
                                total={String(d.value)}
                                nominal='0'
                                kurs='0'
                                key={index3}
                              />
                            ));
                          })} */}
                          {data.data.map((dt: any, index: number) => {
                            return (
                              <RenderDetailTabelBuying key={index} data={dt} />
                            );
                          })}
                        </>
                      )
                    )}
                    {dataTabelBuyingHumico.map((data: any, index: number) => (
                      <>
                        <Text
                          mt='10px'
                          fontSize='13px'
                          borderStyle='none'
                          px='0px'
                          fontWeight='bold'
                          ml='4px'
                          textTransform='capitalize'
                          key={index}
                        >
                          {data.label}
                        </Text>
                        {data.data.map((dt: any, index2: number) => {
                          return (
                            <>
                              <TdTabelDetail
                                name={dt[0].label ?? ''}
                                total={dt[0].value ?? 0}
                                key={index2}
                                isHumico={true}
                              />
                              <TdTabelDetail
                                name={dt[1].label ?? ''}
                                total={dt[1].value ?? 0}
                                key={index2}
                                isHumico={true}
                              />
                            </>
                          );
                          // return dt.map((d: any, index3: number) => (
                          //   <TdTabelDetail
                          //     name={d.label ?? ''}
                          //     total={dt.value ?? 'null'}
                          //   />
                          // ));
                        })}
                      </>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </Box>
            {/* Tabel detail seling */}
            <Box
              w={{
                base: '100%',
                sm: '100%',
                md: '50%',
                xl: '50%',
              }}
              borderWidth='2px'
              borderColor='gray.400'
              height='auto'
            >
              <Text>Tabel Detail</Text>
              <Box w='full' h='500px' maxH='500px' overflowY='scroll'>
                <Table size='sm'>
                  <Thead px='4px' bgColor='gray.200'>
                    <Tr>
                      <Th
                        borderStyle='none'
                        px='0px'
                        py='4px'
                        fontSize='11px'
                        textTransform='capitalize'
                        textAlign='center'
                      >
                        Fix Isi Jobsheet ID
                      </Th>
                      <Th
                        borderStyle='none'
                        px='0px'
                        py='4px'
                        fontSize='11px'
                        textTransform='capitalize'
                        textAlign='center'
                        w='100px'
                      >
                        Nominal Dipakai 1 IDR 2 USD
                      </Th>
                      <Th
                        borderStyle='none'
                        px='0px'
                        py='4px'
                        fontSize='11px'
                        textTransform='capitalize'
                        textAlign='center'
                      >
                        Nominal
                      </Th>
                      <Th
                        borderStyle='none'
                        px='0px'
                        py='4px'
                        fontSize='11px'
                        textTransform='capitalize'
                        textAlign='center'
                      >
                        Kurs
                      </Th>
                      <Th
                        borderStyle='none'
                        px='0px'
                        py='4px'
                        fontSize='11px'
                        textTransform='capitalize'
                        textAlign='center'
                        w='80px'
                      >
                        Nominal Dollar
                      </Th>
                      <Th
                        borderStyle='none'
                        px='0px'
                        py='4px'
                        fontSize='11px'
                        textTransform='capitalize'
                        textAlign='center'
                      >
                        Action
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {/* name data tabel akan diambil dari data select Fix Isi Jobsheet ID */}
                    {listDataSelling.map(
                      (dataSeling: IDataSeling, index: number) => (
                        <TdTabelDetail
                          name={dataSeling.fixIsiJobsheetID?.label ?? ''}
                          total={String(dataSeling.nominalDipakai1IDR2USD)}
                          nominal={String(dataSeling.nominal)}
                          kurs={String(dataSeling.kurs)}
                          nominalDolar={String(dataSeling.nominalDollar)}
                          key={index}
                          onEdit={handleEditDataSelling}
                          onDelete={handleDeleteDataSelling}
                          id={dataSeling.id}
                          haveAction={true}
                        />
                      )
                    )}
                    {dataAktifSell.map((data: any, index: number) => (
                      <TdTabelDetail
                        haveAction={true}
                        name={
                          data.fix_isijobsheet_id?.label ??
                          getBiayaLapangName(data.fix_isijobsheet_id)
                        }
                        total={data.nominaldipakai}
                        nominal={data.nominal}
                        kurs={data.kurs}
                        nominalDolar={data.nominaldolar}
                        key={index}
                        onEdit={handleEditDataAktifSell}
                        onDelete={handleDeleteDataAktifSell}
                        id={data.id}
                      />
                    ))}
                    {dataTabelDetailSelling.map(
                      (data: IDataTabelBuying, index: number) => (
                        <>
                          <Text
                            mt='10px'
                            fontSize='13px'
                            borderStyle='none'
                            px='0px'
                            fontWeight='bold'
                            ml='4px'
                            textTransform='capitalize'
                            key={index}
                          >
                            {data.label}
                          </Text>
                          {/* {data.data.map((dt: any) => {
        return dt.map((d: IDataValue, index3: number) => (
          <TdTabelDetail
            name={String(d.label)}
            total={String(d.value)}
            nominal='0'
            kurs='0'
            key={index3}
          />
        ));
      })} */}
                          {data.data.map((dt: any, index: number) => {
                            return (
                              <RenderDetailTabelBuying data={dt} key={index} />
                            );
                          })}
                        </>
                      )
                    )}
                  </Tbody>
                </Table>
              </Box>
            </Box>
          </Flex>
        </Box>
        {/* Footer App */}
        <Flex w='full' my='25px' justifyContent='center'>
          <Button
            bgColor='green.300'
            color='white'
            w={320}
            onClick={handlePostData}
            type='submit'
            isLoading={isLoadingFetchPost}
            _hover={{}}
            _focus={{}}
          >
            POST API
          </Button>
        </Flex>
      </Box>
      <Modal
        onClose={() => setIsLoadingFetch(false)}
        closeOnOverlayClick={false}
        isOpen={isLoadingFetch}
      >
        <ModalOverlay />
        <ModalContent
          bgColor='transparent'
          display='flex'
          justifyContent='center'
          maxH='100vh'
          alignItems='center'
        >
          <Spinner
            thickness='6px'
            speed='0.65s'
            emptyColor='gray.200'
            color='green.400'
            size='xl'
          />
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default App;

interface IPropsRender {
  data: any;
}
const RenderDetailTabelBuying: React.FC<IPropsRender> = (props) => {
  const selectName = props.data.filter((dt: any) => dt.label === 'nama');
  const selectTotal = props.data.filter((dt: any) => dt.label === 'dolar');
  const selectNominal = props.data.filter((dt: any) => dt.label === 'nominal');
  const selectKurs = props.data.filter((dt: any) => dt.label === 'kurs');
  const selectNominalDolar = props.data.filter(
    (dt: any) => dt.label === 'nominalkredit'
  );
  return (
    <TdTabelDetail
      name={selectName[0]?.value ?? ''}
      total={selectTotal[0]?.value ?? ''}
      nominal={selectNominal[0]?.value ?? ''}
      kurs={selectKurs[0]?.value ?? ''}
      nominalDolar={selectNominalDolar[0]?.value ?? ''}
    />
  );
};
