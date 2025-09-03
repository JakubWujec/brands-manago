import { describe, it, expect } from 'vitest';
import { processResult } from '../src/idosell/orderReponseProcessor';
import { SINGLE_ORDER_RESULT } from './data/idosell_order';

describe('testprocessResult', () => {
    it('should have the correct NODE_ENV', () => {
        let value = processResult(SINGLE_ORDER_RESULT)
        expect(value.orderId).toBe('admin-3'); 
        expect(value.currency).toBe('PLN'); 
        expect(value.totalPrice).toBe(20); 
        expect(value.products).toHaveLength(1); 
        expect(value.products[0].productId).toBe(85452); 
        expect(value.products[0].productQuantity).toBe(1); 
        expect(value.orderStatus).toBe('finished')
    });

    
});
