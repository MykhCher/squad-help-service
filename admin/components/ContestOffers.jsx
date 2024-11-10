import c from '@adminjs/design-system';
import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react';

function CustomersOrders(props) {

  const { offers } = props.record.params;
  const [ offerList, setOfferList ] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (offers) {
      setOfferList(offers);
    }
  }, [offers]);

  return (
    <>
      <c.Button
        size='default'
        onClick={() => {navigate(-1)}}
      >
        <c.Icon icon='ChevronLeft' /> Back
      </c.Button>
      <c.Table>
        <c.TableHead>
          <c.TableRow>
            <c.TableCell>
              Id
            </c.TableCell>
            <c.TableCell>
              Approved
            </c.TableCell>
          </c.TableRow>
        </c.TableHead>
        <c.TableBody>
          {offerList.map(item => {
            const path = `../../../../Offers/records/${item.id}/show`;

            return (
              <c.TableRow 
                key={item.id} 
                onClick={() => {navigate(path, { relative: 'path' })}} 
                style={{cursor: 'pointer'}}
              >
                <c.TableCell>
                    {item.id}
                </c.TableCell>
                <c.TableCell>
                  <c.Label>
                    {item.approved ? 'Yes' : 'No'}
                  </c.Label>
                </c.TableCell>
              </c.TableRow>
            )
          })}
        </c.TableBody>
      </c.Table>
    </>
  )
}

export default CustomersOrders;