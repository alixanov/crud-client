import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./card.css";
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CircularProgress from '@mui/material/CircularProgress';

// Основной компонент приложения
const App = () => {
  const [data, setData] = useState([]); // Состояние для хранения данных продуктов
  const [deleteState, setDeleteState] = useState(false); // Состояние для контроля обновления данных после удаления
  const [isLoading, setIsLoading] = useState(false); // Состояние для отображения загрузчика
  const [editProduct, setEditProduct] = useState(null); // Состояние для редактируемого продукта
  const [open, setOpen] = useState(false); // Состояние для управления открытием модального окна

  // Эффект для получения данных продуктов из API
  useEffect(() => {
    axios.get('https://crud-db-pink.vercel.app/api/getall')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
      });
  }, [deleteState]); // Перезапуск эффекта при изменении состояния deleteState

  // Функция для удаления продукта
  const handleDelete = (id) => {
    setIsLoading(true); // Включаем загрузчик
    axios.delete(`https://crud-db-pink.vercel.app/api/delete/${id}`)
      .then(res => {
        setIsLoading(false); // Отключаем загрузчик
        setDeleteState(prev => !prev); // Обновляем состояние для получения актуальных данных
      })
      .catch(error => {
        console.error("Ошибка при удалении продукта:", error);
        setIsLoading(false); // Отключаем загрузчик в случае ошибки
      });
  };

  // Функция для открытия модального окна и установки данных редактируемого продукта
  const handleEdit = (product) => {
    setEditProduct(product);
    setOpen(true);
  };

  // Функция для закрытия модального окна
  const handleCloseModal = () => {
    setOpen(false);
  };

  // Функция для отправки обновленных данных продукта
  const handleUpdate = (updatedProduct) => {
    axios.put(`https://crud-db-pink.vercel.app/api/update/${editProduct._id}`, updatedProduct)
      .then(response => {
        setOpen(false); // Закрываем модальное окно
        setDeleteState(prev => !prev); // Обновляем состояние для получения актуальных данных
      })
      .catch(error => {
        console.error('Ошибка при обновлении продукта:', error);
      });
  };

  return (
    <div className='card'>
      {/* Отображаем список продуктов */}
      {data.map((item, index) => (
        <div className="box" key={index}>
          <img src={item.rasm} alt={item.nomi} className="product-image" />
          <p>{item.nomi}</p>
          <h4>{item.soni} количество</h4>
          <span>{item.narxi} $</span>
          <div className="delete__create" style={{ display: 'flex', alignItems: "center", gap: "4px" }}>
            {/* Кнопка для удаления продукта */}
            <button onClick={() => handleDelete(item._id)} disabled={isLoading}>
              {isLoading ? <CircularProgress size={20} /> : 'Удалить'}
              {!isLoading && <DeleteIcon sx={{ color: "crimson", cursor: 'pointer' }} />}
            </button>
            {/* Кнопка для изменения продукта */}
            <button onClick={() => handleEdit(item)}>
              Изменить
              <BorderColorIcon sx={{ color: "lightgreen", cursor: 'pointer' }} />
            </button>
          </div>
        </div>
      ))}

      {/* Модальное окно для изменения продукта */}
      {open && (
        <div className='modal'>
          <div className="modal-content">
            <span className='close' onClick={handleCloseModal}>&times;</span>
            <form onSubmit={(e) => {
              e.preventDefault();
              const updatedProduct = {
                rasm: e.target.rasm.value,
                nomi: e.target.nomi.value,
                soni: e.target.soni.value,
                narxi: e.target.narxi.value,
              };
              handleUpdate(updatedProduct);
            }} className='form'>
              <input
                type="text"
                name="rasm"
                placeholder='Url изображения'
                defaultValue={editProduct?.rasm || ''}
              />
              <input
                type="text"
                name="nomi"
                placeholder='Названия'
                defaultValue={editProduct?.nomi || ''}
              />
              <input
                type="number"
                name="soni"
                placeholder='Количество'
                defaultValue={editProduct?.soni || ''}
              />
              <input
                type="number"
                name="narxi"
                placeholder='Цена'
                defaultValue={editProduct?.narxi || ''}
              />
              <button type="submit">Сохранить изменения</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
