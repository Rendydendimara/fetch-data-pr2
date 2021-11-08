import { Input } from '@chakra-ui/input';
import { Box, Container, Flex, Text } from '@chakra-ui/layout';
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/modal';
import { Spinner } from '@chakra-ui/spinner';
import { Table, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/table';
import React, { useEffect, useState } from 'react';
import Select, { StylesConfig } from 'react-select';
import { IAppHeaderForm, IFormBuying, IFormSelling } from './interface';
import style from './AppStyle.module.css';
import { useToast } from '@chakra-ui/react';
import { Button } from '@chakra-ui/button';
export interface IDataItem {
  label: string;
  data: any;
}

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

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

interface IPropsTdDetail {
  name: string;
  total?: string;
  nominal?: string;
  kurs?: string;
  nominalDolar?: string;
}
const TdTabelDetail: React.FC<IPropsTdDetail> = (props) => {
  return (
    <Tr>
      <Td
        borderStyle='none'
        px='4px'
        py='4px'
        className={style.dataTabelDetail}
      >
        {props.name}
      </Td>
      <Td
        borderStyle='none'
        px='0px'
        py='4px'
        className={style.dataTabelDetail}
      >
        {props.total}
      </Td>
      <Td
        borderStyle='none'
        px='0px'
        py='4px'
        className={style.dataTabelDetail}
      >
        {props.nominal}
      </Td>
      <Td
        borderStyle='none'
        px='0px'
        py='4px'
        className={style.dataTabelDetail}
      >
        {props.kurs}
      </Td>
      <Td
        borderStyle='none'
        px='0px'
        py='4px'
        className={style.dataTabelDetail}
      >
        {props.nominalDolar}
      </Td>
    </Tr>
  );
};

function App() {
  const toast = useToast();
  const [isLoadingFetch, setIsLoadingFetch] = useState<boolean>(false);
  const [listDataBuying, setListDataBuying] = useState<IFormBuying[]>([]);
  const [listDataSelling, setListDataSelling] = useState<IFormSelling[]>([]);
  const [dataAppHeaderForm, setDataAppHeaderForm] = useState<IAppHeaderForm>({
    emkl: '',
    ratePajak: '',
    rateBonus: '',
  });
  const [dataBuyingForm, setDataBuyingForm] = useState<IFormBuying>({
    fixIsiJobsheetID: '',
    nominalDipakai1IDR2USD: '',
    nominal: '',
    kurs: '',
    nominalDollar: '',
    biayaLapangan: '',
  });
  const [dataSellingForm, setDataSellingForm] = useState<IFormSelling>({
    fixIsiJobsheetID: '',
    nominalDipakai1IDR2USD: '',
    nominal: '',
    kurs: '',
    nominalDollar: '',
    biayaLapangan: '',
  });

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
    setDataBuyingForm({
      ...dataBuyingForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeDataFormSelling = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDataSellingForm({
      ...dataSellingForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddListDataBuying = () => {
    setListDataBuying([
      ...listDataBuying,
      {
        fixIsiJobsheetID: dataBuyingForm.fixIsiJobsheetID,
        nominalDipakai1IDR2USD: dataBuyingForm.nominalDipakai1IDR2USD,
        nominal: dataBuyingForm.nominal,
        kurs: dataBuyingForm.kurs,
        nominalDollar: dataBuyingForm.nominalDollar,
        biayaLapangan: dataBuyingForm.biayaLapangan,
      },
    ]);
    toast({
      title: 'Success',
      description: 'success add data buying.',
      status: 'success',
      position: 'bottom-right',
      duration: 5000,
      isClosable: true,
    });
    handleClearFormData('buying');
  };

  const handleAddListDataSelling = () => {
    setListDataSelling([
      ...listDataSelling,
      {
        fixIsiJobsheetID: dataSellingForm.fixIsiJobsheetID,
        nominalDipakai1IDR2USD: dataSellingForm.nominalDipakai1IDR2USD,
        nominal: dataSellingForm.nominal,
        kurs: dataSellingForm.kurs,
        nominalDollar: dataSellingForm.nominalDollar,
        biayaLapangan: dataSellingForm.biayaLapangan,
      },
    ]);
    toast({
      title: 'Success',
      description: 'success add data selling.',
      status: 'success',
      duration: 5000,
      position: 'bottom-right',
      isClosable: true,
    });
    handleClearFormData('selling');
  };

  const handleClearFormData = (formName: 'buying' | 'selling') => {
    if (formName === 'buying') {
      setDataBuyingForm({
        fixIsiJobsheetID: '',
        nominalDipakai1IDR2USD: '',
        nominal: '',
        kurs: '',
        nominalDollar: '',
        biayaLapangan: '',
      });
    } else {
      setDataSellingForm({
        fixIsiJobsheetID: '',
        nominalDipakai1IDR2USD: '',
        nominal: '',
        kurs: '',
        nominalDollar: '',
        biayaLapangan: '',
      });
    }
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    // get id by query params
    console.log('params', params);
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
                      <Select options={options} styles={colourStyles} />
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
                  <Tr>
                    <Td borderStyle='none' px='0px' py='4px'>
                      Biaya Lapangan
                    </Td>
                    <Td borderStyle='none' px='0px' py='4px' height='30px'>
                      <Select options={options} styles={colourStyles} />
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
                  onClick={handleAddListDataBuying}
                >
                  Add
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
                      <Select options={options} styles={colourStyles} />
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
                  <Tr>
                    <Td borderStyle='none' px='0px' py='4px'>
                      Biaya Lapangan
                    </Td>
                    <Td borderStyle='none' px='0px' py='4px' height='30px'>
                      <Select options={options} styles={colourStyles} />
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
                  onClick={handleAddListDataSelling}
                >
                  Add
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
                    <Text
                      mt='10px'
                      fontSize='13px'
                      borderStyle='none'
                      px='0px'
                      fontWeight='bold'
                      ml='4px'
                    >
                      Biaya Master
                    </Text>
                    <TdTabelDetail
                      name='EMKL'
                      total='1.175.000'
                      nominal='0'
                      kurs='0'
                    />
                    <TdTabelDetail
                      name='Truck'
                      total='2.050.000'
                      nominal='0'
                      kurs='0'
                    />
                    <TdTabelDetail
                      name='FUM AQIS 80GR'
                      total='1.734.693'
                      nominal='0'
                      kurs='0'
                    />
                    <Text
                      mt='10px'
                      fontSize='13px'
                      borderStyle='none'
                      px='0px'
                      fontWeight='bold'
                      ml='4px'
                    >
                      Biaya Lapangan
                    </Text>
                    <TdTabelDetail name='sopir' total='100.000' />
                    <TdTabelDetail name='makan tenaga' total='40.000' />
                    <TdTabelDetail name='um udx' total='40.000' />
                    <TdTabelDetail name='Ngemel Tally depo' />
                    <TdTabelDetail name='minta container' />
                    <TdTabelDetail name='bagus' total='35.000' />
                    <Text
                      mt='10px'
                      fontSize='13px'
                      borderStyle='none'
                      px='0px'
                      fontWeight='bold'
                      ml='4px'
                    >
                      Asset Stuffing
                    </Text>
                    <TdTabelDetail name='humico' total='6' />
                    <TdTabelDetail name='harge_humico' total='138.000' />
                    <TdTabelDetail name='tampar' total='1' />
                    <TdTabelDetail name='harga_tampar' total='19.000' />
                    <TdTabelDetail name='murbaut' total='1' />
                    <TdTabelDetail name='harga_murbaut' total='2.000' />
                    <TdTabelDetail name='plastik' total='0' />
                    <TdTabelDetail name='harga_plastik' total='0' />
                    <TdTabelDetail name='aqua' total='1' />
                    <TdTabelDetail name='harga_aqua' total='17.500' />
                    <TdTabelDetail name='janur' total='0' />
                    <TdTabelDetail name='harga_janur' total='0' />
                    <TdTabelDetail name='baygon' total='0' />
                    <TdTabelDetail name='harga_baygon' total='0' />
                    {/* name data tabel akan diambil dari data select Fix Isi Jobsheet ID */}
                    {listDataBuying.map(
                      (dataBuying: IFormBuying, index: number) => (
                        <TdTabelDetail
                          name={`Data ${index + 1}`}
                          total={String(dataBuying.nominalDipakai1IDR2USD)}
                          nominal={String(dataBuying.nominal)}
                          kurs={String(dataBuying.kurs)}
                          nominalDolar={String(dataBuying.nominalDollar)}
                          key={index}
                        />
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
                      (dataSelling: IFormSelling, index: number) => (
                        <TdTabelDetail
                          name={`Data ${index + 1}`}
                          total={String(dataSelling.nominalDipakai1IDR2USD)}
                          nominal={String(dataSelling.nominal)}
                          kurs={String(dataSelling.kurs)}
                          nominalDolar={String(dataSelling.nominalDollar)}
                          key={index}
                        />
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
