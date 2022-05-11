import { FormHandles } from '@unform/core';
import { createRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { TFood } from '../../types/TFood';
import { Input } from '../Input';
import { Modal } from '../Modal';
import { Form } from './styles';

interface ModalAddFoodProps {
  isOpen: boolean;
  onClose: () => void;
  handleAddFood: (food: TFood) => void;
}

export function ModalAddFood({
  isOpen,
  handleAddFood,
  onClose,
}: ModalAddFoodProps) {
  const formRef = createRef<FormHandles>();

  const handleSubmit = async (data: any) => {
    handleAddFood(data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name='image' placeholder='Cole o link aqui' />

        <Input name='name' placeholder='Ex: Moda Italiana' />
        <Input name='price' placeholder='Ex: 19.90' />

        <Input name='description' placeholder='Descrição' />
        <button type='submit' data-testid='add-food-button'>
          <p className='text'>Adicionar Prato</p>
          <div className='icon'>
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
