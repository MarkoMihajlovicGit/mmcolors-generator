import { useState } from 'react';
import useToggle from './useToggle';

export default function usePaletteListState(props) {
  const [openDeleteDialog, setDeleteDialog] = useToggle(false);
  const [deletingId, setDeletingId] = useState('');

  const openDialog = id => {
    setDeleteDialog(true);
    setDeletingId(id);
  };
  const closeDialog = () => {
    setDeleteDialog(false);
    setDeletingId('');
  };

  const goToPalette = id => {
    props.history.push(`/palette/${id}`);
  };

  const handleDelete = () => {
    props.deletePalette(deletingId);
    closeDialog();
  };
  return {
    openDeleteDialog,
    openDialog,
    closeDialog,
    goToPalette,
    handleDelete
  };
}
