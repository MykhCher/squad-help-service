import { ComponentLoader } from 'adminjs'

export const componentLoader = new ComponentLoader()

export const Components = {
  ContestOffers: componentLoader.add('contestOffers', './ContestOffers'),
}
