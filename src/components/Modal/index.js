import { useEffect, useState } from 'react'
import './index.css'
import { Input } from 'components/Input'
import { Button } from 'components/Button'
import { createItem, updateItem, deleteItem } from 'services/request'

export const Modal = ({ onClose, item }) => {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')

  const validateBeforeSave = () => {
    if (name.length < 3) {
      alert('O nome precisa ter mais de 3 caracteres.')
      return false
    }
    if (quantity < 1) {
      alert('Quantidade não pode ser menor que 1')
      return false
    }
    return true
  }

  const callAddItem = async () => {
    const validate = validateBeforeSave()
    if (validate) {
      const result = await createItem({ name, quantity: parseInt(quantity) })
      if (!result.error) {
        alert('Item salvo com sucesso!')
        onClose()
      }
    }
  }

  const callUpdateItem = async () => {
    const validate = validateBeforeSave()
    if (validate) {
      const result = await updateItem(item?._id, {
        name,
        quantity: Number(quantity),
        checked: item?.checked
      })
      if (!result.error) {
        alert('Item atualizado com sucesso!')
        onClose()
      }
    }
  }

  const callDeleteItem = async () => {
    const result = await deleteItem(item?._id)
    if (!result.error) {
      alert('Item deletado com sucesso!')
      onClose()
    }
  }

  useEffect(() => {
    if (item?.name && item?.quantity) {
      setName(item?.name)
      setQuantity(item?.quantity)
    }
  }, [item])

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h1>{item ? 'Editar item' : 'Adicionar novo item'}</h1>
          <button onClick={onClose} className="modal-close-button"></button>
        </div>
        <Input
          onChange={(text) => setName(text)}
          value={name}
          label="Item"
          placeholder="Arroz"
        />
        <Input
          onChange={(text) => setQuantity(text)}
          value={quantity}
          label="Quantidade"
          placeholder="0"
          type="number"
        />
        <div className="buttons-container">
          <div>
            {' '}
            <Button onClick={item ? callUpdateItem : callAddItem}>
              {item ? 'Atualizar item' : 'Adicionar item'}
            </Button>
          </div>
          <div>
            {item && (
              <Button icon="trash" variant="outline" onClick={callDeleteItem}>
                Deletar item
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
