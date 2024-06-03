/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Characters {
  info?: {
    count?: string;
    pages?: string;
    next?: string;
    prev?: string;
  };
  results?: {
    id?: number;
    name?: string;
    status?: string;
    species?: string;
    type?: string;
    gender?: string;
    origin?: {
      name?: string;
      /** @format url */
      url?: string;
    };
    location?: {
      name?: string;
      /** @format url */
      url?: string;
    };
    /** @format url */
    image?: string;
    episode?: string[];
    /** @format url */
    url?: string;
    /** @format date-time */
    created?: string;
  }[];
}

export interface Episode {
  id?: number;
  name?: string;
  air_date?: string;
  episode?: string;
  characters?: string[];
  url?: string;
  /** @format date-time */
  created?: string;
}

export interface Error {
  message?: string;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from 'axios';
import axios from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor(
    {
      securityWorker,
      secure,
      format,
      ...axiosConfig
    }: ApiConfig<SecurityDataType> = {},
  ) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL:
        axiosConfig.baseURL ||
        'https://virtserver.swaggerhub.com/GERMANSUVOROV134/NikiModels/1.0.0',
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>(
    { secure, path, type, query, format, body, ...params }: FullRequestParams,
  ): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === 'object'
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== 'string'
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData
          ? { 'Content-Type': type }
          : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Hero API
 * @version 1.0.0
 * @baseUrl https://virtserver.swaggerhub.com/GERMANSUVOROV134/NikiModels/1.0.0
 * @contact <german.suvorov134@gmail.com>
 *
 * Hero
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  character = {
    /**
     * No description
     *
     * @tags getCharacters
     * @name GetCharacters
     * @summary метод получения информации о персонажах
     * @request GET:/character
     */
    getCharacters: (
      query?: {
        /** Номер страницы для пагинации */
        page?: number;
        /** Фильтровать по заданному имени */
        name?: string;
        /** Фильтровать по заданному статусу ( alive, deadили unknown). */
        status?: string;
        /** Фильтровать по данному виду. */
        species?: string;
        /** Фильтровать по заданному типу. */
        type?: string;
        /** Фильтровать по указанному полу ( female, male, genderlessили unknown). */
        gender?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Characters, Error>({
        path: `/character`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),
  };
  episode = {
    /**
     * No description
     *
     * @tags getEpisodeById
     * @name GetEpisodeById
     * @summary метод получения информации о эпизоде
     * @request GET:/episode/{episode_id}
     */
    getEpisodeById: (episodeId: number, params: RequestParams = {}) =>
      this.request<Episode, Error>({
        path: `/episode/${episodeId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
}
