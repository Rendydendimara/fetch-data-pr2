import { Button } from '@chakra-ui/button';
import { Flex } from '@chakra-ui/layout';
import { Td, Tr } from '@chakra-ui/table';
import React from 'react';
import style from './style.module.css';

interface IProps {
  id?: number;
  name: string;
  total?: string;
  nominal?: string;
  kurs?: string;
  nominalDolar?: string;
  haveAction?: boolean;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const TdTabelDetail: React.FC<IProps> = (props) => {
  const handleEdit = () => {
    if (props.haveAction && props.onEdit) {
      props.onEdit(props.id ?? 0);
    }
  };
  const handleDelete = () => {
    if (props.haveAction && props.onDelete) {
      props.onDelete(props.id ?? 0);
    }
  };

  return (
    <Tr>
      <Td
        borderStyle='none'
        px='4px'
        py='4px'
        className={style.dataTabelDetail}
        textTransform='capitalize'
        maxW='10px'
      >
        {props.name.replaceAll('_', ' ')}
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
      <Td
        borderStyle='none'
        px='0px'
        py='4px'
        className={style.dataTabelDetail}
      >
        {props.haveAction && (
          <Flex alignItems='center' gridGap='15px' justifyContent='center'>
            <Button
              size='sm'
              backgroundColor='orange.400'
              color='white'
              fontWeight='600'
              onClick={handleEdit}
            >
              Edit
            </Button>
            <Button
              size='sm'
              backgroundColor='red.400'
              color='white'
              fontWeight='600'
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Flex>
        )}
      </Td>
    </Tr>
  );
};

export default TdTabelDetail;
