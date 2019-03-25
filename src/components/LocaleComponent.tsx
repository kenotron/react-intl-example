import React from 'react';
import qs from 'querystring';
import intl from 'react-intl-universal';

const getLocale = (locale: string) => import(`../locale/${locale}/strings.json`);

export interface LocaleComponentState {
  isLoading: boolean;
}

export class LocaleComponent extends React.Component<{}, LocaleComponentState> {
  /**
   *
   */
  constructor(props: {}) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  async loadLocales() {
    const langQueryString = qs.parse(window.location.search.slice(1)).lang as string;
    const currentLocale = langQueryString || 'en';
    const localeData = await getLocale(currentLocale);
    await intl.init({
      currentLocale,
      locales: {
        [currentLocale]: localeData
      }
    });
    this.setState({
      isLoading: false
    });
  }

  componentDidMount() {
    this.loadLocales();
  }

  render() {
    return !this.state.isLoading ? <>{this.props.children}</> : null;
  }
}
