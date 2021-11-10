import { Input } from '@chakra-ui/input';
import { Box, Container, Flex, Text } from '@chakra-ui/layout';
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/modal';
import { Spinner } from '@chakra-ui/spinner';
import { Table, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/table';
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

const convertUSDFormat = (num: string, type: 'IDR' | 'USD'): string => {
  if (type === 'IDR') {
    return Number(num)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  } else {
    return '';
    // return num.toLocaleString('en-US', {
    //   style: 'currency',
    //   currency: 'USD',
    // }); /* $2,500.00 */
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
  const [isLoadingFetch, setIsLoadingFetch] = useState<boolean>(false);
  const [listDataBuying, setListDataBuying] = useState<IDataBuying[]>([]);
  const [listDataSelling, setListDataSelling] = useState<IDataSeling[]>([]);
  const [dataAppHeaderForm, setDataAppHeaderForm] = useState<IAppHeaderForm>({
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

  const getDataJobsheetID = async () => {
    // const response = await ApiGetDataJobsheetID();

    const response = await axios.get(
      '/api/apcargo/public/admin/getJSbuyingSelling',
      CONFIG_FETCH
    );

    console.log('response', response);
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

  const handleChangeJobSheetID = (
    newValue: OnChangeValue<ISelectJobSheetID, false>,
    actionMeta: ActionMeta<any>
  ) => {
    console.log('newValue', newValue);
  };

  const handleChangeJobSheetIDBuying = (
    newValue: OnChangeValue<ISelectJobSheetID, false>,
    actionMeta: ActionMeta<any>
  ) => {
    console.log('newValue', newValue);
    setDataBuyingForm({
      ...dataBuyingForm,
      fixIsiJobsheetID: newValue,
    });
  };

  const handleChangeJobSheetIDSelling = (
    newValue: OnChangeValue<ISelectJobSheetID, false>,
    actionMeta: ActionMeta<any>
  ) => {
    console.log('newValue', newValue);
    setDataSellingForm({
      ...dataBuyingForm,
      fixIsiJobsheetID: newValue,
    });
  };

  const handleChangeDataAppHeaderForm = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDataAppHeaderForm({
      ...dataAppHeaderForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeDataFormBuying = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.target.name === 'kurs' && event.target.value === '999') {
      setDataBuyingForm({
        ...dataBuyingForm,
        [event.target.name]: event.target.value,
        nominalDollar: '',
      });
    } else {
      setDataBuyingForm({
        ...dataBuyingForm,
        [event.target.name]: event.target.value,
      });
      let temp = {
        ...dataBuyingForm,
        [event.target.name]: event.target.value,
      };
      if (temp.kurs && temp.nominalDipakai1IDR2USD && temp.nominal) {
        const nominal = Number(temp.nominal) / Number(temp.kurs);
        temp = {
          ...temp,
          nominalDollar: String(nominal),
        };
      } else {
        temp = {
          ...temp,
          nominalDollar: '',
        };
      }
      setDataBuyingForm(temp);
    }
  };

  const handleChangeDataFormSelling = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.target.name === 'kurs' && event.target.value === '999') {
      setDataSellingForm({
        ...dataSellingForm,
        [event.target.name]: event.target.value,
        nominalDollar: '',
      });
    } else {
      let temp = {
        ...dataSellingForm,
        [event.target.name]: event.target.value,
      };
      if (temp.kurs && temp.nominalDipakai1IDR2USD && temp.nominal) {
        const nominal = Number(temp.nominal) / Number(temp.kurs);
        temp = {
          ...temp,
          nominalDollar: String(nominal),
        };
      } else {
        temp = {
          ...temp,
          nominalDollar: '',
        };
      }
      setDataSellingForm(temp);
    }
  };

  const handleAddUpdateListDataBuying = () => {
    if (idEditFormBuying) {
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
  };

  const handleEditDataBuying = (id: number) => {
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
  const handleDeleteDataBuying = (id: number) => {
    const newDataBuying = listDataBuying.filter(
      (data: IDataBuying) => data.id !== id
    );
    setListDataBuying(newDataBuying);
  };

  const handleEditDataSelling = (id: number) => {
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
    console.log('response', response);
    if (response.status === 200) {
      const dataPasif: any[] = [];
      const dataAktifSell: any[] = [];
      const pasif = response.data.hasil.pasif;
      const aktif = response.data.hasil.aktif;
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
      aktif.sell.map((da: any) => {
        let temp: IDataValue[] = [];
        for (let keyDt in da) {
          temp.push({
            label: keyDt,
            value: da[keyDt],
          });
        }
        dataAktifSell.push(temp);
      });
      // pasif[key].map((da: any) => {
      //   let temp: IDataValue[] = [];
      //   for (let keyDt in da) {
      //     temp.push({
      //       label: keyDt,
      //       value: da[keyDt],
      //     });
      //   }
      //   tempData.push(temp);
      // });
      let tempData: any[] = [];
      aktif.buy.map((da: any) => {
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
        label: '',
        data: tempData,
      });
      console.log('dataPasif', dataPasif);
      console.log('dataAktifSell', dataAktifSell);
      setDataTabelDetailBuying(dataPasif);
      setDataTabelDetailSelling(dataAktifSell);
    }
  };

  useEffect(() => {
    const paramArr = window.location.href.split('/');
    const paramsId = paramArr[paramArr.length - 1];
    console.log('paramsId', paramsId);
    if (paramsId) {
      getDataPanel(paramsId);
    }
    getDataJobsheetID();
  }, []);

  return (
    <Box p='20px'>
      <Box w='full'>
        {/* Header App */}
        <Box w='full' mb='25px'>
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
                      value={dataAppHeaderForm.ratePajak}
                      onChange={handleChangeDataAppHeaderForm}
                      height='30px'
                      type='number'
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
                      value={dataAppHeaderForm.rateBonus}
                      onChange={handleChangeDataAppHeaderForm}
                      height='30px'
                      type='number'
                    />
                  </Td>
                </Tr>
              </Tbody>
            </Table>
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
                        value={dataBuyingForm.nominalDipakai1IDR2USD}
                        onChange={handleChangeDataFormBuying}
                        type='number'
                        height='30px'
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
                        value={dataBuyingForm.nominal}
                        onChange={handleChangeDataFormBuying}
                        type='number'
                        height='30px'
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
                        value={dataBuyingForm.kurs}
                        onChange={handleChangeDataFormBuying}
                        type='number'
                        height='30px'
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
                        value={dataBuyingForm.nominalDollar}
                        onChange={handleChangeDataFormBuying}
                        type='number'
                        height='30px'
                      />
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
              <Flex justifyContent='center' w='full' mt='10px'>
                <Button
                  width='200px'
                  height='35px'
                  bgColor='green.300'
                  color='white'
                  onClick={handleAddUpdateListDataBuying}
                >
                  {idEditFormBuying ? 'Update' : 'Add'}
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
                        value={dataSellingForm.nominalDipakai1IDR2USD}
                        onChange={handleChangeDataFormSelling}
                        type='number'
                        height='30px'
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
                        value={dataSellingForm.nominal}
                        onChange={handleChangeDataFormSelling}
                        type='number'
                        height='30px'
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
                        value={dataSellingForm.kurs}
                        onChange={handleChangeDataFormSelling}
                        type='number'
                        height='30px'
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
                        value={dataSellingForm.nominalDollar}
                        onChange={handleChangeDataFormSelling}
                        type='number'
                        height='30px'
                      />
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
              <Flex justifyContent='center' w='full' mt='10px'>
                <Button
                  width='200px'
                  height='35px'
                  bgColor='green.300'
                  color='white'
                  onClick={handleAddUpdateListDataSelling}
                >
                  {idEditFormSelling ? 'Update' : 'Add'}
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
                          {data.data.map((dt: any) => {
                            return RenderDetailTabelBuying(dt);
                          })}
                        </>
                      )
                    )}
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
                          {data.data.map((dt: any) => {
                            return RenderDetailTabelBuying(dt);
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
          <Button bgColor='green.300' color='white' w={320}>
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

const RenderDetailTabelBuying: React.FC<any> = (props) => {
  // 0: {label: "id", value: "2637"}
  // 1: {label: "deleted_at", value: null}
  // 2: {label: "created_at", value: "2021-08-16 10:34:33"}
  // 3: {label: "nama", value: "EMKL"}
  // 4: {label: "kode", value: "41"}
  // 5: {label: "fix_shipment_id", value: "1344"}
  // 6: {label: "nominal", value: "1250000"}
  // 7: {label: "keterangan", value: "Kinarya/0821-8478"}
  // 8: {label: "file", value: null}
  // 9: {label: "dates", value: null}
  // 10: {label: "autosplit", value: null}
  // 11: {label: "dolar", value: "0"}
  // 12: {label: "kurs", value: "0"}
  // 13: {label: "tipe", value: null}
  // 14: {label: "fix_coa_id_pph", value: "0"}
  // 15: {label: "fix_coa_id_kredit", value: "21"}
  // 16: {label: "fix_coa_id_pphk", value: "0"}
  // 17: {label: "nominalkredit", value: "1250000"}
  // 18: {label: "rekening_id", value: null}
  // 19: {label: "fix_coahelper_id", value: "108"}
  const selectName = props.filter((dt: any) => dt.label === 'nama');
  const selectTotal = props.filter((dt: any) => dt.label === 'dolar');
  const selectNominal = props.filter((dt: any) => dt.label === 'nominal');
  const selectKurs = props.filter((dt: any) => dt.label === 'kurs');
  const selectNominalDolar = props.filter(
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
