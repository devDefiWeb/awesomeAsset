import React, { useState, useEffect } from 'react';
import { Checkbox, Table, TableBody, TableCell, TableHead, TableRow, Modal, Button, Box, Grid } from '@mui/material';
import Title from './Title';
import { asset } from '../type';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface IAssetProps {
  assetList: asset[]
  pageSize: number
}

const Assets: React.FC<IAssetProps> = ({
  assetList,
  pageSize,
}) => {
  // state
  const [checkList, setCheckList] = useState<boolean[]>(new Array(pageSize).fill(false));
  const [open, setOpen] = useState<boolean>(false);
  const [checkedIndex, setCheckedIndex] = useState<number[]>(new Array(2).fill(0));
  const [detailIndex, setDetailIndex] = useState<number>(-1);
  const [detailOpen, setDetailOpen] = useState<boolean>(false);

  useEffect(() => {
    if (detailIndex > -1) {
      setDetailOpen(true);
    }
  }, [detailIndex])

  // methods
  const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    let _checkList: boolean[] = checkList.slice();
    _checkList[index] = e.target.checked;
    setCheckList(_checkList);

    // check true count
    let trueCount = _checkList.reduce((result, check) => check ? result + 1 : result, 0);
    let _checkedIndex: number[] = []
    if (trueCount === 2) {
      _checkList.map((check: boolean, index: number) => check && _checkedIndex.push(index));
      setCheckedIndex(_checkedIndex.slice());
      setOpen(true);
    }
  }

  const handleClickCloseButton = () => {
    setOpen(false);
    setCheckList(new Array(pageSize).fill(false));
  }

  const handleClickCloseDetailButton = () => {
    setDetailOpen(false);
    setDetailIndex(-1);
  }

  return (
    <React.Fragment>
      <Title>Assets</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price Usd</TableCell>
            <TableCell>Data Start</TableCell>
            <TableCell>Data End</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {assetList.map((row: asset, index: number) =>
            <TableRow key={row.asset_id}>
              <TableCell>
                <Checkbox
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeCheckbox(e, index)}
                  checked={checkList[index]}
                />
              </TableCell>
              <TableCell onClick={() => setDetailIndex(index)} sx={{ cursor: 'pointer' }}>{row.name}</TableCell>
              <TableCell onClick={() => setDetailIndex(index)} sx={{ cursor: 'pointer' }}>{(row.price_usd || 1).toFixed(3)}</TableCell>
              <TableCell onClick={() => setDetailIndex(index)} sx={{ cursor: 'pointer' }}>{new Date(row.data_start).toDateString()}</TableCell>
              <TableCell onClick={() => setDetailIndex(index)} sx={{ cursor: 'pointer' }}>{new Date(row.data_end).toDateString()}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* rate modal */}
      <Modal
        hideBackdrop
        open={open}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <h2 id="child-modal-title">Exchange Rate</h2>
          <p id="child-modal-description">
            {open ? (
              `1 ${assetList[checkedIndex[0]].name} : ${(((assetList[checkedIndex[0]]).price_usd || 1) / ((assetList[checkedIndex[1]]).price_usd || 1)).toFixed(3)} ${assetList[checkedIndex[1]].name}`
            ) : null}
          </p>
          <Button onClick={handleClickCloseButton} sx={{ float: 'right' }}>
            Close
          </Button>
        </Box>
      </Modal>
      {/* detail modal */}
      <Modal
        hideBackdrop
        open={detailOpen}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <h2 id="child-modal-title">Asset Detail</h2>
          {detailOpen ? (
            <Grid container>
              <Grid item xs={6}>
                Asset ID:
              </Grid>
              <Grid item xs={6}>
                {assetList[detailIndex].asset_id}
              </Grid>
              <Grid item xs={6}>
                Name:
              </Grid>
              <Grid item xs={6}>
                {assetList[detailIndex].name}
              </Grid>
              <Grid item xs={6}>
                Type Is Crypto:
              </Grid>
              <Grid item xs={6}>
                {assetList[detailIndex].type_is_crypto ? 'Yes' : 'No'}
              </Grid>
              <Grid item xs={6}>
                Data Quote Start:
              </Grid>
              <Grid item xs={6}>
                {new Date(assetList[detailIndex].data_quote_start).toDateString()}
              </Grid>
              <Grid item xs={6}>
                Data Quote End:
              </Grid>
              <Grid item xs={6}>
                {new Date(assetList[detailIndex].data_quote_end).toDateString()}
              </Grid>
              <Grid item xs={6}>
                Data Trade Start:
              </Grid>
              <Grid item xs={6}>
                {new Date(assetList[detailIndex].data_trade_start).toDateString()}
              </Grid>
              <Grid item xs={6}>
                Data Trade End:
              </Grid>
              <Grid item xs={6}>
                {new Date(assetList[detailIndex].data_trade_end).toDateString()}
              </Grid>
              <Grid item xs={6}>
                Data Symbols Count:
              </Grid>
              <Grid item xs={6}>
                {assetList[detailIndex].data_symbols_count}
              </Grid>
              <Grid item xs={6}>
                Volumn 1hrs USD:
              </Grid>
              <Grid item xs={6}>
                {assetList[detailIndex].volume_1hrs_usd.toFixed(2)}
              </Grid>
              <Grid item xs={6}>
                Volumn 1day USD:
              </Grid>
              <Grid item xs={6}>
                {assetList[detailIndex].volume_1day_usd.toFixed(2)}
              </Grid>
              <Grid item xs={6}>
                Volumn 1mth USD:
              </Grid>
              <Grid item xs={6}>
                {assetList[detailIndex].volume_1mth_usd.toFixed(2)}
              </Grid>
              <Grid item xs={6}>
                Price Used:
              </Grid>
              <Grid item xs={6}>
                {(assetList[detailIndex].price_usd || 1).toFixed(2)}
              </Grid>
              <Grid item xs={6}>
                Data Start:
              </Grid>
              <Grid item xs={6}>
                {new Date(assetList[detailIndex].data_start).toDateString()}
              </Grid>
              <Grid item xs={6}>
                Data End:
              </Grid>
              <Grid item xs={6}>
                {new Date(assetList[detailIndex].data_end).toDateString()}
              </Grid>
            </Grid>
          ) : null}
          <Button onClick={handleClickCloseDetailButton} sx={{ float: 'right' }}>
            Close
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default Assets;
