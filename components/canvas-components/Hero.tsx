import Link from "next/link";
import {
  registerUniformComponent,
  ComponentProps,
} from "@uniformdev/canvas-react";
import Splitter from "../atoms/Splitter";

export type EntryProps = {
	title: string;
	text: string;
	buttonText?: string;
	buttonLink?: string;
	image?: string;
};

export type HeroProps = {
	heroDatasource: EntryProps;
};

export function Hero(props: HeroProps) {
  console.log('looooog = ' + JSON.stringify(props));
  return (
    <>
      <div className="pt-24">
        <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left min-h-500">
            <p className="uppercase tracking-loose w-full">
              This is Uniform demo
            </p>
            <h1
              className="my-4 text-5xl font-bold leading-tight"
              dangerouslySetInnerHTML={{ __html: props?.heroDatasource?.title }}
            />
            <p
              className="leading-normal text-2xl mb-8"
              dangerouslySetInnerHTML={{ __html: props?.heroDatasource?.text }}
            />
            {props?.heroDatasource?.buttonText ? (
              <Link prefetch={false} href={props?.heroDatasource?.buttonLink ? props?.heroDatasource?.buttonLink : "#"}>
                <button className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg">
                  {props?.heroDatasource?.buttonText}
                </button>
              </Link>
            ) : null}
          </div>
          <div className="w-full md:w-3/5 py-6 text-center">
            {props?.heroDatasource?.image && (
              <img
                className="w-full md:w-4/5 z-50 min-h-500 max-h-500"
                height={500}
                src={props?.heroDatasource?.image}
                alt={props?.heroDatasource?.buttonText}
              />
            )}
          </div>
        </div>
      </div>
      <Splitter />
    </>
  );
}

registerUniformComponent({
  type: "hero",
  component: Hero,
});
