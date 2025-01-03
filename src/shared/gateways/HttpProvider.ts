import api from './AxiosInterceptor';

export abstract class HttpProvider {
  public async post(url: string, data: Object): Promise<Response> {
    return api.post(url, data);
  }

  public async update(url: string, data: Object): Promise<Response> {
    return api.put(url, data);
  }
  public async delete(url: string): Promise<Response> {
    return api.delete(url, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  public async upload(url: string, data: any): Promise<Response> {
    return api.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  public async get(url: string): Promise<Response> {
    return api.get(url);
  }
}
