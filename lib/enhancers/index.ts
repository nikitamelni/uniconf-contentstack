import {
  enhance,
  EnhancerBuilder,
  RootComponentInstance,
} from "@uniformdev/canvas";
import { GetStaticPropsContext } from "next";
import contentstack from 'contentstack';
import {
  createContentstackEnhancer,
  CANVAS_CONTENTSTACK_PARAMETER_TYPES,
} from '@uniformdev/canvas-contentstack';

// TODO: to enable contentful enhancers:
//import { CANVAS_CONTENTFUL_PARAMETER_TYPES } from "@uniformdev/canvas-contentful";

// import getContentfulEnhancer from "./contentful";

export default async function runEnhancers(
  composition: any,
  context: GetStaticPropsContext
) {
  const csClient = contentstack.Stack({
    api_key: process.env.CONTENTSTACK_API_KEY ?? '',
    delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN ?? '',
    environment: process.env.CONTENTSTACK_ENVIRONMENT ?? '',
    region: contentstack.Region.US,
  });

  const entryEnhancer = createContentstackEnhancer({ client: csClient });

  const { preview } = context || {};
  //TODO: register your CMS specific enhancers here
  // see docs: https://docs.uniform.app/canvas/tutorials/enhancers
  await enhance({
    composition,
    enhancers: new EnhancerBuilder()
      .parameterType(
        CANVAS_CONTENTSTACK_PARAMETER_TYPES,
        entryEnhancer
      ),
    context: {},
  });
//  console.log(JSON.stringify(composition));
  return composition;
}