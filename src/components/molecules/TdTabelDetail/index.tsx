import { Button } from '@chakra-ui/button';
import { Flex } from '@chakra-ui/layout';
import { Td, Tr } from '@chakra-ui/table';
import React from 'react';
import { convertUSDFormat } from '../../../App';
import style from './style.module.css';

interface IProps {
  id?: number;
  name: string;
  total?: string;
  nominal?: string;
  kurs?: string;
  nominalDolar?: string;
  haveAction?: boolean;
  isHumico?: boolean;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const TdTabelDetail: React.FC<IProps> = (props) => {
  const handleEdit = () => {
    if (props.haveAction && props.onEdit) {
      props.onEdit(Number(props.id) ?? 0);
    }
  };
  const handleDelete = () => {
    if (props.haveAction && props.onDelete) {
      props.onDelete(Number(props.id) ?? 0);
    }
  };

  if (props.isHumico) {
    return (
      <Tr w='full'>
        <Td
          borderStyle='none'
          px='4px'
          py='4px'
          className={style.dataTabelDetail}
          textTransform='capitalize'
          textAlign='left'
          justifyContent='center'
          alignItems='center'
        >
          {props.name.replaceAll('_', ' ')}
        </Td>
        <Td
          borderStyle='none'
          px='0px'
          py='4px'
          textAlign='center'
          justifyContent='center'
          alignItems='center'
          className={style.dataTabelDetail}
        >
          {props.total ? convertUSDFormat(Number(props.total ?? 0), 'IDR') : 0}
        </Td>
      </Tr>
    );
  }

  return (
    <Tr w='full'>
      <Td
        borderStyle='none'
        px='4px'
        py='4px'
        className={style.dataTabelDetail}
        textTransform='capitalize'
        textAlign='left'
        justifyContent='center'
        alignItems='center'
      >
        {props.name.replaceAll('_', ' ')}
      </Td>
      <Td
        borderStyle='none'
        px='0px'
        py='4px'
        textAlign='center'
        justifyContent='center'
        alignItems='center'
        className={style.dataTabelDetail}
      >
        {props.total ? convertUSDFormat(Number(props.total ?? 0), 'IDR') : 0}
      </Td>
      <Td
        borderStyle='none'
        px='0px'
        py='4px'
        textAlign='center'
        justifyContent='center'
        alignItems='center'
        className={style.dataTabelDetail}
      >
        {props.nominal
          ? convertUSDFormat(Number(props.nominal ?? 0), 'IDR')
          : 0}
      </Td>
      <Td
        borderStyle='none'
        px='0px'
        py='4px'
        textAlign='center'
        justifyContent='center'
        alignItems='center'
        className={style.dataTabelDetail}
      >
        {props.kurs ? convertUSDFormat(Number(props.kurs ?? 0), 'IDR') : 0}
      </Td>
      <Td
        borderStyle='none'
        px='0px'
        py='4px'
        textAlign='center'
        justifyContent='center'
        alignItems='center'
        className={style.dataTabelDetail}
      >
        {props.nominalDolar
          ? convertUSDFormat(Number(props.nominalDolar), 'IDR')
          : 0}
      </Td>
      <Td
        borderStyle='none'
        px='0px'
        py='4px'
        className={style.dataTabelDetail}
      >
        {props.haveAction && (
          <Flex
            textAlign='center'
            justifyContent='center'
            alignItems='center'
            gridGap='15px'
          >
            {props.onEdit && (
              <Button
                size='sm'
                backgroundColor='orange.400'
                color='white'
                fontWeight='600'
                onClick={handleEdit}
              >
                Edit
              </Button>
            )}
            {props.onDelete && (
              <Button
                size='sm'
                backgroundColor='red.400'
                color='white'
                fontWeight='600'
                onClick={handleDelete}
              >
                Delete
              </Button>
            )}
          </Flex>
        )}
      </Td>
    </Tr>
  );
};

export default TdTabelDetail;
