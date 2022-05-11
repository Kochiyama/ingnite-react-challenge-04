import { FormHandles } from '@unform/core';
import { createRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { TFood } from '../../types/TFood';
import { Input } from '../Input';
import { Modal } from '../Modal';
import { Form } from './styles';

interface ModalEditFoodProps {
  isOpen: boolean;
  handleUpdateFood: (data: TFood) => void;
  onClose: () => void;
  editingFood?: TFood;
}

export function ModalEditFood({
  isOpen,
  handleUpdateFood,
  onClose,
  editingFood,
}: ModalEditFoodProps) {
  const formRef = createRef<FormHandles>();

  const handleSubmit = async (data: TFood) => {
    handleUpdateFood(data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name='image' placeholder='Cole o link aqui' />

        <Input name='name' placeholder='Ex: Moda Italiana' />
        <Input name='price' placeholder='Ex: 19.90' />

        <Input name='description' placeholder='Descrição' />

        <button type='submit' data-testid='edit-food-button'>
          <div className='text'>Editar Prato</div>
          <div className='icon'>
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
